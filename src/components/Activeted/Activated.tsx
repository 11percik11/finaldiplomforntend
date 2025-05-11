import { useEffect } from 'react';
// import { useActivateMutation } from '@/store/api/auth.api';
import { useParams } from 'react-router-dom';
import styles from './Activated.module.css';
import { useActivateMutation } from '../../app/userApi';
// import { log } from 'console';

const EmailConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activate, { isLoading, isError, isSuccess }] = useActivateMutation();
  console.log('Activation ID:', id);
  useEffect(() => {
    if (id) {
      activate({ id });
    }
  }, [id, activate]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <>
          <div className={`${styles.statusIcon} ${styles.success}`}>⏳</div>
          <h1 className={styles.title}>Подтверждение почты</h1>
          <p className={styles.message}>
            Идёт проверка вашего email, пожалуйста, подождите...
          </p>
        </>
      )}
      
      {isError && (
        <>
          <div className={`${styles.statusIcon} ${styles.error}`}>✖</div>
          <h1 className={styles.title}>Ошибка подтверждения</h1>
          <p className={styles.message}>
            К сожалению, мы не смогли подтвердить ваш email. Возможно, ссылка устарела или неверна.
            Пожалуйста, попробуйте запросить новое письмо для подтверждения.
          </p>
        </>
      )}
      
      {isSuccess && (
        <>
          <div className={`${styles.statusIcon} ${styles.success}`}>✓</div>
          <h1 className={styles.title}>Email успешно подтверждён!</h1>
          <p className={styles.message}>
            Спасибо за подтверждение вашего email. Теперь вы можете пользоваться всеми возможностями нашего сервиса.
          </p>
        </>
      )}
    </div>
  );
};

export default EmailConfirmationPage;