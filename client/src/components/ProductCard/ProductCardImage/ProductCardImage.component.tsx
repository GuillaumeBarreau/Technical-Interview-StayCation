import { TProductCardImage } from "../ProductCard.types";
import styles from "./ProductCardImage.module.scss";

const ProductCardImage = (props: TProductCardImage) => {
  return <img className={styles.productCardImage} {...props} />;
};

export default ProductCardImage;
