import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import {
  useGetCartQuery,
  useLazyGetCartQuery,
  useRemoveFromCartMutation,
} from "../../app/cart";
import { BASE_URL } from "../../constants";
import { MinusPlus } from "../PlusMinus";
import { Cart, CartItem } from "../../app/types";

const CartPage = () => {
  const [removeFromCart] = useRemoveFromCartMutation();
  const [triggerCart] = useLazyGetCartQuery();
  const [value, setValue] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const { data: cart, isLoading } = useGetCartQuery();

  useEffect(() => {
    if (cart?.items) {
      const initialQuantities = cart.items.reduce(
        (acc: { [key: string]: number }, item: CartItem) => {
          acc[item.id] = item.quantity;
          return acc;
        },
        {}
      );
      setQuantities(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    if (cart?.items) {
      const totalValue = cart.items.reduce((sum: number, item: CartItem) => {
        return checkedItems[item.id]
          ? sum + item.product.price * (quantities[item.id] || item.quantity)
          : sum;
      }, 0);
      setValue(totalValue);
    }
  }, [cart, checkedItems, quantities]);

  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      const allChecked = cart.items.every(
        (item: CartItem) => checkedItems[item.id]
      );
      setIsChecked(allChecked);
    } else {
      // Если корзина пуста, "выбрать всё" должно быть false
      setIsChecked(false);
    }
  }, [checkedItems, cart]);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart({ productId }).unwrap();
      await triggerCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSelectAllChange = () => {
    if (cart?.items) {
      const newCheckedState = !isChecked;
      const updatedCheckedItems = cart.items.reduce(
        (acc: { [key: string]: boolean }, item: CartItem) => {
          acc[item.id] = newCheckedState;
          return acc;
        },
        {}
      );

      setCheckedItems(updatedCheckedItems);
      setIsChecked(newCheckedState);
    }
  };

  const handleQuantityChange = (itemId: string, newCount: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newCount,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.cartPage}>
      <div className={styles.CartPageBox}>
        <div className={styles.CartPageBoxDisp}>
          <div className={styles.CartPageInput}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSelectAllChange}
            />
            <div>Выбрать всё </div>
          </div>
          <div className={styles.cartItems}>
            {cart?.items.map((item: CartItem) => (
              <div key={item.id} className={styles.productCard}>
                <img
                  className={styles.imgProduct}
                  src={`${BASE_URL}${item.product.avatarUrl}`}
                  alt={item.product.title}
                />
                <div className={styles.productDetails}>
                  <h3>{item.product.title}</h3>
                  <p>{item.product.description}</p>
                  <div className={styles.price}>{item.product.price} ₽</div>
                  <div className={styles.boxPlus}>

                  <MinusPlus
                    count={quantities[item.id] || item.quantity}
                    onChange={(newCount) =>
                      handleQuantityChange(item.id, newCount)
                    }
                    />
                    </div>
                  <button onClick={() => handleRemoveFromCart(item.productId)}>
                    Удалить
                  </button>
                </div>
                <div className={styles.checkboxPlus}>
                  <input
                  //  className={styles.checkboxPlus}
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.cartSummary}>
          <form className={styles.fromContainer}>
            <div className={styles.CartPrice}>
              <div>Итого:</div>
              <div>{value} ₽</div>
            </div>
            <button type="button">Заказать</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
