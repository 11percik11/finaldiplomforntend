// components/EditProductModal.tsx
import React, { useRef, useState } from "react"
import { Product } from "../../app/types"
import styles from './EditProductModal.module.css';
import { useUpdateProductMutation } from "../../app/productApi"

interface EditProductModalProps {
  product: Product
  onClose: () => void
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [fileName, setFileName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    
    const formData = new FormData(formRef.current)
    
    try {
      await updateProduct({ 
        userData: formData, 
        id: product.id 
      }).unwrap()
      onClose()
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.editProduct}>
        <div className={styles.header}>
          <h2>Edit Product</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className={styles.editProduct__form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              className={styles.input}
              defaultValue={product.title}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              className={styles.textarea}
              defaultValue={product.description}
              required
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              className={styles.input}
              defaultValue={product.price}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Image</label>
            <div className={styles.fileInputWrapper}>
              <label className={styles.fileInputLabel}>
                Choose File
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  accept="image/*"
                  className={styles.fileInput}
                />
              </label>
              <span className={styles.fileName}>
                {fileName || "No file chosen"}
              </span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.loadingText}>Saving...</span>
              ) : (
                "Сохранить изменения"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal