import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { BsThreeDotsVertical } from "react-icons/bs"
import styles from "./index.module.css"
import { BASE_URL } from "../../constants"
import { CreateComment } from "../createComment"

import {
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
} from "../../app/productApi"
import {
  useLikeProductMutation,
  useUnlikeProductMutation,
} from "../../app/likesApi"
import { useCurrentQuery } from "../../app/userApi"
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../app/commentsApi"
import { useAddToCartMutation } from "../../app/cart"

export const Tovar = () => {
  const { id } = useParams<{ id: string }>()
  const { data: currentUser } = useCurrentQuery()
  const { data: productData, isLoading } = useGetProductByIdQuery(id ?? "")
  const [trigger] = useLazyGetProductByIdQuery()

  const [likeProduct] = useLikeProductMutation()
  const [unlikeProduct] = useUnlikeProductMutation()
  const [addToCart] = useAddToCartMutation()

  const [deleteComment] = useDeleteCommentMutation()
  const [updateComment] = useUpdateCommentMutation()

  const [liked, setLiked] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    if (currentUser?.likes && id) {
      setLiked(currentUser.likes.some(like => like.productId === id))
    }
  }, [currentUser, id])

  const handleLike = async () => {
    if (!id) return
    liked ? await unlikeProduct({ id }) : await likeProduct({ productId: id })
    setLiked(!liked)
    await trigger(id)
  }

  const handleAddToCart = async () => {
    if (!id) return
    try {
      await addToCart({ productId: id }).unwrap()
      // alert("Товар добавлен в корзину")
    } catch (err) {
      console.error("Ошибка добавления в корзину:", err)
    }
  }

  const handleEditClick = (comment: any) => {
    setEditingCommentId(comment.id)
    setCommentText(comment.text)
    setActiveMenu(null)
  }

  const handleSaveClick = async () => {
    try {
      if (editingCommentId) {
        await updateComment({
          id: editingCommentId,
          text: commentText,
        }).unwrap()
        setEditingCommentId(null)
        await trigger(id ?? "")
      }
    } catch (error) {
      console.error("Ошибка обновления:", error)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment({ id: commentId }).unwrap()
    await trigger(id ?? "")
    setActiveMenu(null)
  }

  const toggleMenu = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index)
  }

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productCard}>
  <div className={styles.imageBox}>
    <img src={`${BASE_URL}${productData?.avatarUrl}`} alt="Product" />
  </div>

  <div className={styles.detailsBox}>
    <div className={styles.headerRow}>
      <button onClick={handleAddToCart} className={styles.cartButton}>
        В корзину — {productData?.price} ₽
      </button>
    </div>

    <div className={styles.infoBlock}>
      <h2 className={styles.productTitle}>{productData?.title}</h2>
      <p><strong>Описание:</strong> {productData?.description}</p>
      <p><strong>Цвет:</strong> {productData?.color}</p>
      <p><strong>Модель:</strong> {productData?.model}</p>
      <p><strong>Возраст:</strong> {productData?.age}</p>
      <p><strong>Пол:</strong> {productData?.sex}</p>
      <p><strong>Размер:</strong> {productData?.size}</p>
    </div>

    <div className={styles.likeWrapper}>
      <button onClick={handleLike} className={styles.likeButton}>
        {liked ? <FcLike /> : <FcLikePlaceholder />}
        <span>{productData?.likes?.length ?? 0}</span>
      </button>
    </div>
  </div>
</div>

      <section className={styles.commentsSection}>
        <h3>Комментарии</h3>
        <CreateComment />

        {productData?.comments?.length ? (
          productData.comments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div className={styles.commentCard} key={index}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentUser}>
                    <img
                      src={`${BASE_URL}${comment.user.avatarUrl}`}
                      alt={comment.user.name}
                      className={styles.avatar}
                    />
                    <span>{comment.user.name}</span>
                  </div>

                  {comment.userId === currentUser?.id && (
                    <div className={styles.commentMenu}>
                      <BsThreeDotsVertical onClick={() => toggleMenu(index)} />
                      {activeMenu === index && (
                        <div className={styles.dropdown}>
                          <button onClick={() => handleEditClick(comment)}>
                            Изменить
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className={styles.commentEdit}>
                    <input
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Редактировать комментарий"
                    />
                    <button onClick={handleSaveClick}>Сохранить</button>
                  </div>
                ) : (
                  <p className={styles.commentText}>{comment.text}</p>
                )}
              </div>
            ))
        ) : (
          <p>Нет комментариев</p>
        )}
      </section>
    </div>
  )
}
