import React, { useState } from "react";
import styles from "./index.module.css";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import EditProduct from "../editProduct";
import { DeleteProduct } from "../deleteProduct";


const MyProductCard = ({ product }: any) => {
  console.log(product.product);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate()
    const prodId = () => {
        navigate(`/product/${product.id}`)
    }

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

    const deleteModal = () => {
      setModalDelete(true);
    };
    const closeDeleteModal = () => {
      setModalDelete(false);
    };

  return (
    <>
    <div className={styles.productCard}>
      <img
        src={`${BASE_URL}${product.avatarUrl}`}
        alt={product.title}
        />
      <div className={styles.price}>{product.price} ₽</div>
      <button onClick={prodId}>
        <h3>{product.title}</h3>
      </button>
      <p>{product.description}</p>
      <button onClick={openModal}>Изменить данные</button>
      <button onClick={deleteModal}>Удалить</button>
    </div>
    {isModalOpen && <EditProduct data={product} onClose={closeModal} />}
    {isModalDelete && <DeleteProduct data={product} onClose={closeDeleteModal} />}
    </>
  );
};

export default MyProductCard;
