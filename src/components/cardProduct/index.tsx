import React from "react";
import styles from "./index.module.css";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation} from "../../app/cart";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();
  const [addToCart] = useAddToCartMutation(); // Use the mutation hook

  const prodId = () => {
    navigate(`/product/${product.product.id}`);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product.product.id }).unwrap();
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img
          onClick={prodId}
          src={`${BASE_URL}${product.product.avatarUrl}`}
          alt={product.product.title}
        />
      </div>
      <button onClick={prodId}>
        <h3 className={styles.h3}>{product.product.title}</h3>
      </button>
      <div className={styles.boxIntormation}>
        <p className={styles.price}>{product.product.price} ₽</p>
        <p className={styles.divP2}>{product.product.description}</p>
      </div>
      <button onClick={handleAddToCart}>Добавить в корзину</button>
    </div>
  );
};

export default ProductCard;
