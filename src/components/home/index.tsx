import React from "react";
import styles from "./index.module.css";
import { useGetAllProductQuery } from "../../app/productApi";
import ProductCard from "../cardProduct";

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   avatarUrl: string;
//   likes: any[]; // Массив лайков (уточните тип при необходимости)
//   comments: any[]; // Массив комментариев (уточните тип при необходимости)
// }

const Home: React.FC = () => {
  const { data } = useGetAllProductQuery();
  console.log(data);

  return (
    <div className={styles.layout}>
      <div className={styles.productList}>
        {data && data.length > 0 ? (
          data.map((product: any) => (
            <>
              
              <ProductCard key={product.id} product={product} />
            </>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
