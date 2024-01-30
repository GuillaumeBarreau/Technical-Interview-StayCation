import styles from "./ProductCardDetails.module.scss";
import ProductCardRating from "./ProductCardRating/ProductCardRating.component";
import ProductCardText from "../../Typography/Typography.component";
import { TProductCardDetails } from "../ProductCard.types";

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
