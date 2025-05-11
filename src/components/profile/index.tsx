import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { useCurrentQuery } from "../../app/userApi"
import { BASE_URL } from "../../constants"
import { useNavigate } from "react-router-dom"
import EditProfileModal from "../EditProfileModal"
import { FaPen } from "react-icons/fa"
// import { CiSettings } from "react-icons/ci"
// import { IoNotificationsOutline } from "react-icons/io5"
import { FiLogOut } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { logout } from "../userSlice"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [dataUser, setDataUser] = useState(() =>
    JSON.parse(localStorage.getItem("dataUser") || "{}"),
  )

  const { data, isLoading, isError } = useCurrentQuery()

  useEffect(() => {
    if (data && !isLoading && !isError) {
      localStorage.setItem("dataUser", JSON.stringify(data))
      setDataUser(data)
    }
  }, [data, isLoading, isError])
  const finalData = data || dataUser

  const myProduct = () => {
    navigate("/myproduct")
  }

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  const Cart = () => {
    navigate("/cart")
  }

  // const LogOut = () => {
  //   localStorage.removeItem("token")
  //   localStorage.removeItem("dataUser")
  //   navigate("/auther")
  // }

  const hadleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auther")
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionBox}>
            <div className={styles.imageContainer}>
              <img src={`${BASE_URL}${finalData?.avatarUrl}`} alt="Product" />
            </div>
            <div className={styles.details}>
              <p>{finalData?.name}</p>
              <p>{finalData?.email}</p>
              <p>{finalData?.phone}</p>
            </div>
            <div>
              <FaPen className={styles.pen} onClick={openModal} />
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.CiSettings} onClick={hadleLogout}>
              <FiLogOut className={styles.CiSettingsSvg} />
              <div className={styles.SvgMarg}>Log Out</div>
            </div>
          </div>
        <div className={styles.buttonGroup}>
          <button onClick={Cart}>Корзина товара</button>
          {(dataUser.role === "ADMIN" || dataUser.role === "MANAGER") && (
            <button onClick={myProduct}>Мой товар</button>
          )}
          {(dataUser.role === "ADMIN") && (
            <button onClick={() => navigate('/adminpanel')}>Админ панель</button>
          )}
        </div>
        </div>

      </div>
      {isModalOpen && (
        <EditProfileModal
          data={finalData}
          onClose={closeModal}
          onProfileUpdated={setDataUser}
        />
      )}
    </>
  )
}

export default Profile
