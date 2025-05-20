import React, { useEffect } from "react"
import styles from "./index.module.css"
import { useGetAllProductQuery } from "../../app/productApi"
import ProductCard from "../cardProduct"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { setProducts } from "../productSlice"

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.product.list)

  const { data, isSuccess, isLoading } = useGetAllProductQuery({})

  useEffect(() => {
    if (isSuccess && products.length === 0) {
      dispatch(setProducts(data.map((p: any) => p.product ?? p)))
    }
  }, [isSuccess, data, dispatch])

  // console.log(data)
  // console.log(products)
if (isLoading) {
  return <div className={styles.loading}>Загрузка...</div>
}


  return (
    <div className={styles.layout}>
      <div className={styles.productList}>
        {products.length > 0 ? (
          products.map((entry: any) => {
            const product = entry.product ?? entry
            return <ProductCard key={product.id} product={product} />
          })
        ) : (
          <p>Нет товара</p>
        )}
      </div>
    </div>
  )
}

export default Home
