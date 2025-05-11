// import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { CreateComment } from "../createComment";
import {
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
} from "../../app/productApi";
import {
  useLikeProductMutation,
  useUnlikeProductMutation,
} from "../../app/likesApi";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useCurrentQuery } from "../../app/userApi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeleteCommentMutation, useUpdateCommentMutation } from "../../app/commentsApi";
import { useEffect, useState } from "react";
import { useAddToCartMutation } from "../../app/cart";

export const Tovar = () => {
  const { data } = useCurrentQuery();
  const { id } = useParams<{ id: string }>();
  const { data: productData, isLoading } = useGetProductByIdQuery(id ?? "");
  const [updateComment] = useUpdateCommentMutation(); // Правильное название хука
  const [deleteComment] = useDeleteCommentMutation();
  const [trigerLazyProductQuery] = useLazyGetProductByIdQuery();
  const navigate = useNavigate();
  const [likeProduct] = useLikeProductMutation();
  const [unlikeProduct] = useUnlikeProductMutation();
  const [liked, setLiked] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    if (data?.likes && id) {
      const isLiked = data.likes.some((like) => like.productId === id);
      setLiked(isLiked);
    }
  }, [data, id]);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  const userName = productData?.user?.name ?? "Unknown User";

  const handleLikeClick = async () => {
    if (liked) {
      await unlikeProduct({ id: id ?? "" });
      await trigerLazyProductQuery(id ?? "");
      setLiked(false);
    } else {
      await likeProduct({ productId: id ?? "" });
      await trigerLazyProductQuery(id ?? "");
      setLiked(true);
    }
  };

  const deleteProductButt = async (comment: any) => {
    await deleteComment({id: comment.id}).unwrap();
    await trigerLazyProductQuery(id ?? "");
    setActiveMenu(null);
  }

  // const profile = () => {
  //   navigate(`/profile/${productData?.userId}`);
  // };

  const toggleMenu = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleEditClick = (comment: any) => {
    setEditingCommentId(comment.id);
    setCommentText(comment.text);
    setActiveMenu(null);
  };

  const handleSaveClick = async () => {
    try {
      await updateComment({ text: commentText, id: editingCommentId! }).unwrap();
      setEditingCommentId(null);
      await trigerLazyProductQuery(id ?? "");
    } catch (error) {
      console.error("Ошибка при обновлении комментария:", error);
    }
  };

  // const { id } = useParams();
  const handleAddToCart = async () => {
    if (!id) return; // Если id нет, просто выходим
    
    try {
      await addToCart({ productId: id }).unwrap();
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productSection}>
          <div className={styles.imageContainer}>
            <img src={`${BASE_URL}${productData?.avatarUrl}`} alt="Product" />
          </div>
          <div className={styles.productDetails}>
            <p className={styles.productTitle}>
              Название товара: {productData?.title}
            </p>
            <p className={styles.productDescription}>
              Описание товара: {productData?.description}
            </p>
            {/* <div className={styles.sellerInfo}>
              <p className={styles.sellerLabel}>Продавец:</p>
              <img
                onClick={profile}
                className={styles.avatar}
                src={`${BASE_URL}${productData?.user.avatarUrl}`}
                alt={`${userName}'s avatar`}
              />
              <p className={styles.userName}>{userName}</p>
            </div> */}
            <div className={styles.likeSection}>
              <div onClick={handleLikeClick} className={styles.likeButton}>
                {liked ? <FcLike /> : <FcLikePlaceholder />}
                {productData?.likes.length ?? 0}
              </div>
            </div>
          </div>
          <div className={styles.priceSection}>
            <p>Цена товара: {productData?.price} руб.</p>
            <button onClick={handleAddToCart} className={styles.addToCartButton}>В корзину</button>
          </div>
        </div>

        <CreateComment />

        <div className={styles.commentsSection}>
          {productData?.comments && productData.comments.length > 0 ? (
            productData.comments
              .slice()
              .reverse()
              .map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <div className={styles.divBoxImgName}>
                      <img
                        src={`${BASE_URL}${comment.user.avatarUrl}`}
                        alt={`${comment.user.name}'s avatar`}
                        className={styles.avatar}
                      />
                      <div className={styles.userInfo}>
                        <p className={styles.userName}>{comment.user.name}</p>
                      </div>
                    </div>

                    {comment.userId === data?.id && (
                      <div className={styles.menuWrapper}>
                        <BsThreeDotsVertical
                          onClick={() => toggleMenu(index)}
                          className={styles.menuIcon}
                        />
                        {activeMenu === index && (
                          <div className={styles.dropdownMenu}>
                            <button onClick={() => handleEditClick(comment)}>
                              Изменить
                            </button>
                            <button onClick={() => deleteProductButt(comment)}>
                              Удалить
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {editingCommentId === comment.id ? (
                    <div className={styles.editComment}>
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className={styles.commentInput}
                      />
                      <button onClick={handleSaveClick} className={styles.saveButton}>
                        Сохранить
                      </button>
                    </div>
                  ) : (
                    <p className={styles.commentText}>{comment.text}</p>
                  )}
                </div>
              ))
          ) : (
            <p className={styles.noComments}>No comments available</p>
          )}
        </div>
      </div>
    </>
  );
};
