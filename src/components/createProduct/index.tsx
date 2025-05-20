import React, { FormEvent, useRef, useState } from "react"
import styles from "./index.module.css"
import { useCreateProductMutation } from "../../app/productApi"
import { useLazyCurrentQuery } from "../../app/userApi"

export const CreateProduct: React.FC = () => {
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [sex, setSex] = useState("")
  const [model, setModel] = useState("")
  const [age, setAge] = useState("")

  const [title, setTitle] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<string | number>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [createProduct, { isLoading, error }] = useCreateProductMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = event.target.value
    if (inputPrice === "") {
      setPrice("")
    } else if (Number(inputPrice) <= 100000000) {
      setPrice(Number(inputPrice))
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (Number(price) > 10000000) {
      // alert("Price cannot exceed 100,000,000 ₽")
      return
    }

    if (!selectedFile) {
      // alert("Please select a file")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("avatar", selectedFile)
    formData.append("quantity", quantity.toString())
    formData.append("color", color)
    formData.append("size", size)
    formData.append("sex", sex)
    formData.append("model", model)
    formData.append("age", age)

    try {
      await createProduct(formData).unwrap()
      await triggerCurrentQuery()

      // Очистка всех полей
      setTitle("")
      setDescription("")
      setPrice("")
      setSelectedFile(null)
      setQuantity(1)
      setColor("")
      setSize("")
      setSex("")
      setModel("")
      setAge("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      console.error("Failed to create product", err)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.h2}>Создание товара</h2>
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
            ref={fileInputRef}
            onChange={handleFileChange}
            required
            className={styles.fileInput}
            accept="image/*"
          />
        </label>
      </div>

      <div className={styles.boxButton}>
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Добавление..." : "Добавить товар"}
        </button>
      </div>

      {error && <p className={styles.error}>Ошибка при создании товара</p>}
    </form>
  )
}

export default CreateProduct
