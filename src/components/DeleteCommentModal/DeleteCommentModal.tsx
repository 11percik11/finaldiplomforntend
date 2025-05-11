import { useDeleteAdminCommentMutation } from '../../app/commentsApi';
import styles from './DeleteCommentModal.module.css';
// import { useDeleteProductMutation } from "../../app/productApi";

interface DeleteCommentModalProps {
  productID: string; 
  onClose: () => void;
}

const DeleteCommentModal: React.FC<DeleteCommentModalProps> = ({
  productID,
  onClose
}) => {
  const [deleteComment] = useDeleteAdminCommentMutation();
  
  const deleteProd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await deleteComment({id: productID}).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.editProduct}>
        <div className={styles.header}>
          <h2>Удаление Лайка</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          <div>Вы уверены что хотите удалить Лайк?</div>
          <div>
            <button onClick={deleteProd}>Удалить</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentModal;