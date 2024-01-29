import { TProductCardPrice } from '../ProductCard.types';
import Typography from '@/components/Typography/Typography.component';
import Badge from '@/components/Badge/Badge.component';
import styles from './ProductCardPrice.module.scss';

const ProductCardPrice = (props: TProductCardPrice) => {
  const { price, discountPrice, percentageDiscount } = props;

  if (!price) {
    return null;
  }

  return (
    <div className={styles.ProductCardPriceWrapper}>
      {discountPrice && <Typography>{`${discountPrice}€`}</Typography>}
      <Typography fontSize="small">
        <del>{`${price}€`}</del>
      </Typography>
      {discountPrice && percentageDiscount && <Badge>{`-${percentageDiscount}%`}</Badge>}
    </div>
  );
};

export default ProductCardPrice;
