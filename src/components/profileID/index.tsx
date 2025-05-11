import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../../app/userApi';
import styles from "./index.module.css";
import { BASE_URL } from '../../constants';

export const ProfileId = () => {
    const { id } = useParams()
    const { data: userData } = useGetUserByIdQuery(id ?? "");

    const user = userData;
    console.log(userData);
    
  return (
    <>
      <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <img src={`${BASE_URL}${userData?.avatarUrl}`} alt="Product" />
        </div>
        <div className={styles.details}>
          <p>Name: {userData?.name}</p>
          <p>Email: {userData?.email}</p>
          <p>Phone: {userData?.phone}</p>
          <button>Написать</button>
        </div>
      </div>
    </div>
    </>
  )
}
