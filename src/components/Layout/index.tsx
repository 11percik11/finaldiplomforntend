import { useEffect } from "react";
import Header from "../header";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.css"
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../userSlice";

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Получаем токен как строку

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate("/auther");
    }
  }, [isAuthenticated, token, navigate]);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};