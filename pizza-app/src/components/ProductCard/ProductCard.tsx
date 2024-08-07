import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
  return (
    <div className={styles['card']}>
      <div className={styles['head']}>
        <div className={styles['price']}>
          {props.price}&#8381;
        </div>
        <button className={styles['add-to-cart']}>
          <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
        </button>
        <div className={styles['rating']}>
          {props.rating}
          <img src="/star-icon.svg" alt="Рейтинг" />
        </div>
      </div>
      <div className={styles['footer']}>
        <div className={styles['title']}>{props.title}</div>
        <div className={styles['description']}>{props.description}</div>
      </div>
    </div>
  );
}

export default ProductCard;