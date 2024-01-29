import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductCard.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.productCardWrapper}>
      <Skeleton height="16.25rem" />
      <Skeleton count={2} />
      <Skeleton width="120px" height="1.75rem" />
    </div>
  );
};
