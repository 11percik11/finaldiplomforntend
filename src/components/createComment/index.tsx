import React, { useState } from "react";
import styles from "./index.module.css";
import { useCreateCommentMutation } from "../../app/commentsApi";
import { useParams } from "react-router-dom";
import { useLazyGetProductByIdQuery } from "../../app/productApi";

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [triggerProductByIdQuery] = useLazyGetProductByIdQuery()
  const [createComment] = useCreateCommentMutation();

  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (typeof id === "string") {
        await createComment({ text: comment, id }).unwrap();
        console.log("Comment submitted: ", comment);
        await triggerProductByIdQuery(id);
        setComment("");
      } else {
        throw new Error("ID is not defined or not a string");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <>
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
          />
          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
        </form>
      </div>
    </>
  );
};
