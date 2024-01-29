import { TProductCardImage } from '../ProductCard.types';
import styles from './ProductCardImage.module.scss';

const ProductCardImage = (props: TProductCardImage) => {
  const { src, alt } = props;
  return <img className={styles.productCardImage} src={src} alt={alt} />;
};

export default ProductCardImage;
