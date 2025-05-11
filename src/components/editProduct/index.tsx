import React, { useState } from 'react';
import styles from './index.module.css';
import { useLazyCurrentQuery } from '../../app/userApi';
import { useUpdateProductMutation } from '../../app/productApi'; // Импортируйте правильный хук

const EditProduct = ({ data, onClose }: any) => {
    const [updateProduct] = useUpdateProductMutation(); // Используйте правильный хук
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const [name, setName] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');
    const [price, setPrice] = useState(data.price || '');
    const [file, setFile] = useState<File | null>(null);
    const id = data.id; // Предположим, что id есть в данных

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', name); // Исправлено на name
        formData.append('description', description);
        formData.append('price', price.toString());
        if (file) {
            formData.append('avatar', file);
        }

        try {
            await updateProduct({ userData: formData, id }).unwrap(); // Исправлено на userData
            await triggerCurrentQuery();
            onClose();
        } catch (error) {
            console.error('Failed to update product:', error); // Исправлено сообщение
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Редактировать продукт</h2> {/* Исправлено заголовок */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <label>Название</label> {/* Исправлено на название */}
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label>Описание</label> {/* Исправлено на описание */}
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label>Цена</label> {/* Исправлено на цена */}
                        <input
                            type="text"
                            name="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label>Изображение</label> {/* Исправлено на изображение */}
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className={styles.inputFile}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>Сохранить</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
