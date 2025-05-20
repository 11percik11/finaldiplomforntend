import React, { useState, FormEvent } from "react"
import styles from "./index.module.css"
import { useUpdateProductMutation } from "../../app/productApi"
import { useLazyCurrentQuery } from "../../app/userApi"


interface EditProductProps {
  data: any
  onClose: () => void
}

const EditProduct: React.FC<EditProductProps> = ({ data, onClose }) => {
  const [title, setTitle] = useState(data.title || "")
  const [description, setDescription] = useState(data.description || "")
  const [price, setPrice] = useState<string | number>(data.price || "")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [quantity, setQuantity] = useState(data.quantity || 1)
  const [color, setColor] = useState(data.color || "")
  const [size, setSize] = useState(data.size || "")
  const [sex, setSex] = useState(data.sex || "")
  const [model, setModel] = useState(data.model || "")
  const [age, setAge] = useState(data.age || "")

  const [updateProduct] = useUpdateProductMutation()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = e.target.value
    if (inputPrice === "") {
      setPrice("")
    } else if (Number(inputPrice) <= 100000000) {
      setPrice(Number(inputPrice))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (Number(price) > 100000000) {
    //   alert("Цена не может быть больше 100 000 000 ₽")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("quantity", quantity.toString())
    formData.append("color", color)
    formData.append("size", size)
    formData.append("sex", sex)
    formData.append("model", model)
    formData.append("age", age)

    if (selectedFile) {
      formData.append("avatar", selectedFile)
    }

    try {
      await updateProduct({ userData: formData, id: data.id }).unwrap()
      await triggerCurrentQuery()
    //   alert("Товар обновлён")
      onClose()
    } catch (err) {
      console.error("Ошибка при обновлении товара:", err)
    //   alert("Ошибка при обновлении товара")
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.h2}>Редактировать товар</h2>

        <label>
          Название:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label>
          Описание:
          <textarea
            className={styles.textArea}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>

        <div className={styles.divDisplay}>
          <label>
            Количество:
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              required
              className={styles.input}
            />
          </label>

          <label>
            Цвет:
            <select
              value={color}
              onChange={e => setColor(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Выберите цвет</option>
              {[
                "Чёрный",
                "Белый",
                "Коричневый",
                "Серый",
                "Бежевый",
                "Синий",
                "Красный",
                "Бордовый",
                "Зелёный",
                "Металлик",
              ].map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.divDisplay}>
          <label>
            Размер:
            <input
              type="number"
              min={1}
              max={50}
              value={size}
              onChange={e => setSize(e.target.value)}
              required
              className={styles.input}
            />
          </label>

          <label>
            Пол:
            <select
              value={sex}
              onChange={e => setSex(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Выберите пол</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
              <option value="Мужской и Женский">Мужской и Женский</option>
            </select>
          </label>
        </div>

        <div className={styles.divDisplay}>
          <label>
            Модель:
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Выберите модель</option>
              {[
                "Кроссовки",
                "Кеды",
                "Туфли",
                "Ботинки",
                "Сапоги",
                "Сандалии",
                "Босоножки",
                "Мокасины",
                "Балетки",
                "Сабо",
              ].map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label>
            Возраст:
            <select
              value={age}
              onChange={e => setAge(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Выберите возраст</option>
              {["Детский", "Подростковый", "Взрослый"].map(a => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.divDisplay}>
          <label>
            Цена:
            <div className={styles.priceInput}>
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                required
                min={1}
                max={100000000}
                className={styles.input}
              />
            </div>
          </label>

          <label className={styles.fileInputLabel}>
            Изображение:
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              accept="image/*"
            />
          </label>
        </div>

        <div className={styles.boxButton}>
          <button type="submit" className={styles.button}>
            Сохранить изменения
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
