import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
// import { GrCart } from "react-icons/gr";
// import { IoHomeOutline } from "react-icons/io5";

const Header: React.FC = () => {
    const navigate = useNavigate()
    // const profile = () => {
    //     navigate("/profile")
    // }
  const home = () => {
      navigate("/")
  }

    // const auther = () => {
    //     navigate("/auther")
    // }

    // const cart = () => {
    //   navigate("/cart")
    // }

    // const chat = () => {
    //   navigate("/chat")
    // }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Лого</div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск..."
        />
      </div>
      <nav className={styles.navButtons}>
        <button className={styles.button} onClick={home}>Главная</button>
        {/* <button className={styles.button} onClick={() => navigate('/auth')}> Авторизация</button> */}
        {/* <button className={styles.button} onClick={() => navigate('/register')}> Регистрация</button>
        <button className={styles.button} onClick={() => navigate('/auther')}> Авторизация</button> */}
        <button className={styles.button} onClick={() => navigate('/profile')}>Профиль</button>
        <button className={styles.button} onClick={() => navigate('/cart')}>Корзина</button>

      </nav>
    </header>
  );
};

export default Header;
