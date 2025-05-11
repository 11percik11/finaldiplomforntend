// import { Product } from "../../app/types"
import styles from './DeleteProductModal.module.css';
import { useDeleteProductMutation } from "../../app/productApi";

interface DeleteProductModalProps {
  productID: string; 
  onClose: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  productID,
  onClose
}) => {
  const [deleteProduct] = useDeleteProductMutation();
  
  const deleteProd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await deleteProduct(productID).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.editProduct}>
        <div className={styles.header}>
          <h2>Удаление продукта</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          <div>Вы уверены что хотите удалить продукт?</div>
          <div>
            <button onClick={deleteProd}>Удалить</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;