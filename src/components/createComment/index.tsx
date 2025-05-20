import React, { useState } from "react";
import styles from "./index.module.css";
import { useCreateCommentMutation } from "../../app/commentsApi";
import { useParams } from "react-router-dom";
import { useLazyGetProductByIdQuery } from "../../app/productApi";

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [triggerProductByIdQuery] = useLazyGetProductByIdQuery();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (errorMessage) setErrorMessage(""); // Сброс ошибки при вводе
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (typeof id === "string") {
        await createComment({ text: comment, id }).unwrap();
        await triggerProductByIdQuery(id);
        setComment("");
      } else {
        throw new Error("ID товара не определён");
      }
    } catch (error: any) {
      if (error?.data?.error === "Вы можете оставить комментарий только на купленный товар") {
        setErrorMessage("Вы можете оставить комментарий только на купленный товар.");
      } else {
        setErrorMessage("Не удалось отправить комментарий. Попробуйте позже.");
      }
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className={styles.divformComment}>
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <label htmlFor="comment" className={styles.label}>
          Оставить комментарий
        </label>
        <textarea
          id="comment"
          className={styles.textarea}
          value={comment}
          onChange={handleChange}
          placeholder="Напишите ваш отзыв..."
        />
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <button type="submit" className={styles.submitButton}>
          Отправить
        </button>
      </form>
    </div>
  );
};
