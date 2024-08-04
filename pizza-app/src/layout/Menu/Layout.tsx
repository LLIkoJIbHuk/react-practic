import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout(){
  return <div className={styles['layout']}>
    <div className={styles['sidebar']}>
      <div className={styles['user']}>
        <img src="/avatar.png" alt="" />
        <div className={styles['name']}>Антон Ларичев</div>
        <div className={styles['email']}>alaricode@ya.ru</div>
      </div>
      <div className={styles['menu']}>
        <Link to='/' className={styles['link']}>
          <img src="/menu-icon.svg" alt="" />
          Меню</Link>
        <Link to='/cart' className={styles['link']}>
          <img src="/cart-icon.svg" alt="" />
          Корзина</Link>
      </div>
      <Button>
        <img src="/exit-icon.svg" alt="" />
        Выход
      </Button>
    </div>
    <div>
      <Outlet/>
    </div>
  </div>;
}