import { TProductCardDetails } from "../ProductCard.types";
import styles from "./ProductCardDetails.module.scss";
import ProductCardRating from "./ProductCardRating/ProductCardRating.component";
import ProductCardText from "./ProductCardText/ProductCardText.component";

const ProductCardDetails = (props: TProductCardDetails) => {
  const { name, stars, preview, reviewCount, averageScore } = props;
  const productCardTextProps = {
    reviewCount,
    averageScore,
    name,
    stars,
  };

  return (
    <div className={styles.productCardDetailsWrapper}>
      <ProductCardRating {...productCardTextProps} />
      <ProductCardText fontSize="small">{preview}</ProductCardText>
    </div>
  );
};

export default ProductCardDetails;
