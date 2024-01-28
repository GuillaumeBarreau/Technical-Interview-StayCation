import styles from "./ProductCard.module.scss";
import { IProductCard } from "./ProductCard.types";
import ProductCardImage from "./ProductCardImage/ProductCardImage.component";
import ProductCardDetails from "./ProductCardDetails/ProductCardDetails.component";

const ProductCard = (props: IProductCard) => {
  const {
    name,
    stars,
    preview,
    pictureId,
    discountPrice,
    reviewCount,
    averageScore,
  } = props;

  const ProductCardDetailsProps = {
    name,
    stars,
    preview,
    discountPrice,
    reviewCount,
    averageScore,
  };

  const ProductCardImageProps = {
    src: pictureId,
    alt: name,
  };

  return (
    <div className={styles.productCardWrapper}>
      <ProductCardImage {...ProductCardImageProps} />
      <ProductCardDetails {...ProductCardDetailsProps} />
    </div>
  );
};

export default ProductCard;
