import { useDeleteUserMutation } from '../../app/userApi';
import styles from './DeleteUserModal.module.css';
// import { useDeleteProductMutation } from "../../app/productApi";

interface DeleteUserModalProps {
  productID: string; 
  onClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  productID,
  onClose
}) => {
  const [deleteUser] = useDeleteUserMutation();
  console.log(productID);
  
  const deleteProd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    try {
      await deleteUser({id: productID}).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.editProduct}>
        <div className={styles.header}>
          <h2>Удаление Пользователя</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          <div>Вы уверены что хотите удалить Пользователя?</div>
          <div>
            <button onClick={deleteProd}>Удалить</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;