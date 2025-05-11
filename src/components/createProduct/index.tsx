import React, { FormEvent, useState } from 'react';
import styles from './index.module.css';
import { useCreateProductMutation } from '../../app/productApi';
import { useLazyCurrentQuery } from '../../app/userApi';

export const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string | number>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = event.target.value;
    if (inputPrice === '') {
      setPrice('');
    } else if (Number(inputPrice) <= 100000000) {
      setPrice(Number(inputPrice));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (Number(price) > 100000000) {
      alert('Price cannot exceed 100,000,000 ₽');
      return;
    }

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('avatar', selectedFile);

    try {
      await createProduct(formData).unwrap();
      await triggerCurrentQuery();
      setTitle('');
      setDescription('');
      setPrice('');
      setSelectedFile(null);
      alert('Product created successfully');
    } catch (err) {
      console.error('Failed to create product', err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Product Title"
        required
        className={styles.input}
      />
      <textarea
        className={styles.textArea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product Description"
        required
      />
      <div className={styles.priceInput}>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Price"
          required
          max={100000000}
          className={styles.input}
        />
      </div>
      <div className={styles.fileInputLabel}>
        Product Image:
        <input 
          type="file" 
          onChange={handleFileChange} 
          required 
          className={styles.fileInput}
          accept="image/*"
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Product'}
      </button>
      {error && <p className={styles.error}>Failed to create product</p>}
    </form>
  );
};

export default CreateProduct;