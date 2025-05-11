import React from "react";
import styles from "./index.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";

type MinusPlusProps = {
  count: number;
  onChange: (newCount: number) => void;
};

export const MinusPlus = ({ count, onChange }: MinusPlusProps) => {
  const handleMinus = () => {
    if (count > 1) {
      onChange(count - 1);
    }
  };

  const handlePlus = () => {
    onChange(count + 1);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleMinus}>
        <FaMinus />
      </button>
      <span className={styles.count}>{count}</span>
      <button className={styles.button} onClick={handlePlus}>
        <FaPlus />
      </button>
    </div>
  );
};
