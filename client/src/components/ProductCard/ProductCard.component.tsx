import styles from "./ProductCard.module.scss";
import { IProductCard } from "./ProductCard.types";
import ProductCardImage from "./ProductCardImage/ProductCardImage.component";
import ProductCardDetails from "./ProductCardDetails/ProductCardDetails.component";
import ProductCardPrice from "./ProductCardPrice/ProductCardPrice.component";

const ProductCard = (props: IProductCard) => {
  const {
    name,
    stars,
    preview,
    pictureId,
    discountPrice,
    reviewCount,
    averageScore,
    price,
    percentageDiscount,
  } = props;

  const ProductCardDetailsProps = {
    name,
    stars,
    preview,
    reviewCount,
    averageScore,
  };

  const ProductCardImageProps = {
    src: pictureId,
    alt: name,
  };

  const ProductCardPriceProps = {
    discountPrice,
    price,
    percentageDiscount,
  };

  return (
    <div className={styles.productCardWrapper}>
      <ProductCardImage {...ProductCardImageProps} />
      <ProductCardDetails {...ProductCardDetailsProps} />
      <ProductCardPrice {...ProductCardPriceProps} />
    </div>
  );
};

export default ProductCard;
