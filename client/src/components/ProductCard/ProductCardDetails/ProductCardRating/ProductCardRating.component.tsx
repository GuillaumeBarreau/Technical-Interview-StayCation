import { TProductCardRating } from "../../ProductCard.types";
import { displayStars } from "../../ProductCard.utils";
import ProductCardText from "../ProductCardText/ProductCardText.component";
import styles from "./ProductCardRating.module.scss";
import StarLogo from "./StarLogo";

const ProductCardRating = (props: TProductCardRating) => {
  const { reviewCount, averageScore, name, stars } = props;

  if ((!reviewCount || reviewCount == 0) && !averageScore && !name) {
    return null;
  }

  return (
    <div className={styles.productCardRatingWrapper}>
      <span className={styles.productCardRatingName}>
        <ProductCardText>{name}</ProductCardText>
        <ProductCardText>{displayStars(stars)}</ProductCardText>
      </span>
      <div className={styles.productCardRatingScore}>
        {averageScore && averageScore != 0 && (
          <>
            <StarLogo />
            <span className={styles.productCardRatingText}>
              {averageScore.toFixed(1)}
            </span>
          </>
        )}
        {reviewCount && reviewCount != 0 && (
          <span className={styles.productCardRatingText}>
            ({reviewCount > 50 ? "+50" : reviewCount})
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardRating;
