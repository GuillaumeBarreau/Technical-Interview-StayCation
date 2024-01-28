import { TProductCardPrice } from "../ProductCard.types";
import Typography from "@/components/Typography/Typography.component";
import styles from "./ProductCardPrice.module.scss";
import Badge from "@/components/Badge/Badge.component";

const ProductCardPrice = (props: TProductCardPrice) => {
  const { price, discountPrice } = props;

  if (!price) {
    return null;
  }

  const percentage = (discountPrice / price) * 100;
  const percentageDiscount = 100 - percentage;

  return (
    <div className={styles.ProductCardPriceWrapper}>
      <Typography>{`${discountPrice}€`}</Typography>
      {discountPrice && (
        <>
          <Typography fontSize="small">
            <del>{`${price}€`}</del>
          </Typography>
          <Badge>{`-${percentageDiscount.toFixed()}%`}</Badge>
        </>
      )}
    </div>
  );
};

export default ProductCardPrice;
