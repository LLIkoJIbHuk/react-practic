import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

export function Menu(){
  return <>
    <div className={styles['head']}>
      <Headling>Меню</Headling>
      <Search placeholder='Введите блюдо или состав' />
    </div>
    <div>
      <ProductCard
        
      />
    </div>
  </>;
}