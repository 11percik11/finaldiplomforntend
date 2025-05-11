import React from "react";
import styles from "./index.module.css";
import { useDeleteProductMutation } from "../../app/productApi";
import { useLazyCurrentQuery } from "../../app/userApi";

export const DeleteProduct = ({ data, onClose }: any) => {
  const [trigerdeleteProduct] = useDeleteProductMutation();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const deleteProd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await trigerdeleteProduct(data.id).unwrap(); // Исправлено на userData
      await triggerCurrentQuery();
      onClose();
    } catch (error) {
      console.error("Failed to update product:", error); // Исправлено сообщение
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div>Вы уверены что хотите удалить Product</div>
          <div className={styles.boxButton}>
            <button onClick={deleteProd}>Удалить</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  );
};
