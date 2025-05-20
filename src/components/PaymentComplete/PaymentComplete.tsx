import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../app/orders";
import styles from "./PaymentComplete.module.css";
import { FiCheckCircle } from "react-icons/fi";

const PaymentComplete = () => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    const pending = localStorage.getItem("pendingOrder");

    if (pending) {
      const items = JSON.parse(pending);
      createOrder({ items })
        .unwrap()
        .then(() => {
          console.log("Заказ создан после оплаты!");
          localStorage.removeItem("pendingOrder");
        })
        .catch(err => {
          console.error("Ошибка при создании заказа:", err);
        });
    }
  }, [createOrder]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <FiCheckCircle className={styles.icon} />
        <h2>Спасибо за заказ!</h2>
        <p>Оплата прошла успешно.</p>
        <button className={styles.button} onClick={() => navigate("/")}>Вернуться на главную</button>
      </div>
    </div>
  );
};

export default PaymentComplete;
