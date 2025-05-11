import { useCurrentQuery } from '../../app/userApi'
import styles from "./index.module.css";
import MyProductCard from '../myCardProduct';
import { CreateProduct } from '../createProduct';

export const MyProduct = () => {
    const {data} = useCurrentQuery()


  return (
    <>
    <CreateProduct />
    <div className={styles.layout}>
    <div className={styles.productList}>
      {data?.products && data.products.length > 0 ? (
        data.products.slice().reverse().map((product) => (
            <MyProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>Нет продуктов</p>
      )}
    </div>
  </div>
    </>
  )
}
