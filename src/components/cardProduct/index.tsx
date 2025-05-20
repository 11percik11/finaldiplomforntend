import React from "react";
import styles from "./index.module.css";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../../app/cart";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();
  const [addToCart] = useAddToCartMutation();
  const [isAdded, setIsAdded] = React.useState(false);

  const goToProduct = () => navigate(`/product/${product.id}`);

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product.id }).unwrap();
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 700);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox} onClick={goToProduct}>
        <img
          className={styles.productImage}
          src={`${BASE_URL}${product.avatarUrl}`}
          alt={product.title}
        />
      </div>

      <div className={styles.titleButton} onClick={goToProduct}>
        <h3 className={styles.title}>{product.title}</h3>
      </div>

      <div className={styles.details}>
        <div className={styles.priceText}>{product.price} ₽</div>
        <p className={styles.description}>{product.description}</p>
      </div>

      <button
        className={`${styles.cartButton} ${isAdded ? styles.added : ""}`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? "Товар добавлен в корзину" : "Добавить в корзину"}
      </button>
    </div>
  );
};

export default ProductCard;
