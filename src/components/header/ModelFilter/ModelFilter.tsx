import React, { useState, useEffect } from "react";
import styles from "./ModelFilter.module.css";

interface ModelFilterProps {
  onClose: () => void;
  onApply: (filters: any) => void;
}

const ModelFilter: React.FC<ModelFilterProps> = ({ onClose, onApply }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sex, setSex] = useState("");
  const [model, setModel] = useState("");
  const [age, setAge] = useState("");

  const [wasCleared, setWasCleared] = useState(false);

  // Загрузка фильтров из localStorage при открытии
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("productFilters") || "{}");
    setMinPrice(savedFilters.minPrice || "");
    setMaxPrice(savedFilters.maxPrice || "");
    setColor(savedFilters.color || "");
    setSize(savedFilters.size || "");
    setSex(savedFilters.sex || "");
    setModel(savedFilters.model || "");
    setAge(savedFilters.age || "");
  }, []);

  const applyFilters = () => {
  const filters = { minPrice, maxPrice, color, size, sex, model, age };

  // Проверка: есть ли хотя бы один активный фильтр
  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  if (hasActiveFilters) {
    localStorage.setItem("productFilters", JSON.stringify(filters));
  } else {
    localStorage.removeItem("productFilters");
  }

  onApply(filters);
};

const handleClose = () => {
  if (wasCleared) {
    onApply({}); // отправляем пустые фильтры
    setWasCleared(false); // сбрасываем флаг
  }
  onClose();
};

  const clearFilters = () => {
  setMinPrice("");
  setMaxPrice("");
  setColor("");
  setSize("");
  setSex("");
  setModel("");
  setAge("");
  localStorage.removeItem("productFilters");
  setWasCleared(true); // флаг сброса
};

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Фильтрация товаров</h2>

        <div className={styles.filterGroup}>
          <label>Цена (от):</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <label>до:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>

        <div className={styles.filterGroup}>
          <label>Цвет:</label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Любой</option>
            {[
              "Чёрный", "Белый", "Коричневый", "Серый", "Бежевый",
              "Синий", "Красный", "Бордовый", "Зелёный", "Металлик",
              "Жёлтый", "Оранжевый", "Фиолетовый", "Розовый"
            ].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Размер:</label>
          <input type="number" min="1" max="50" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>

        <div className={styles.filterGroup}>
          <label>Пол:</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="">Любой</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
            <option value="Мужской и Женский">Мужской и Женский</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Модель:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">Любая</option>
            {[
              "Кроссовки", "Кеды", "Туфли", "Ботинки", "Сапоги",
              "Сандалии", "Босоножки", "Мокасины", "Балетки", "Сабо"
            ].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Возраст:</label>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Любой</option>
            {["Детский", "Подростковый", "Взрослый"].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.applyBtn} onClick={applyFilters}>Применить</button>
          <button className={styles.clearBtn} onClick={clearFilters}>Сбросить</button>
          <button className={styles.closeBtn} onClick={handleClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default ModelFilter;
