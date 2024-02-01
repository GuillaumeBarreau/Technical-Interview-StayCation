import { useQuery } from "@tanstack/react-query";
import { ProductCardSkeleton } from "@/components/ProductCard/ProductCard.skeleton";
import styles from "./CatalogueProducts.module.scss";
import ProductCard from "@/components/ProductCard/ProductCard.component";
import { IProductCard } from "@/components/ProductCard/ProductCard.types";
import { fetchHotels } from "@/api/hotels.api";
import Typography from "@/components/Typography/Typography.component";

const CatalogueProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`hotels`],
    queryFn: (): Promise<IProductCard[]> => fetchHotels.hotelsByLastSale(),
    initialData: [],
  });

  if (isLoading) {
    return Array.from({ length: 10 }).map((_, index) => (
      <li key={index} className={styles.catalogueProductsItem}>
        <ProductCardSkeleton />
      </li>
    ));
  }

  return (
    <div className={styles.catalogueProductsWrapper}>
      {!isError && products?.length > 0 ? (
        <ul className={styles.catalogueProductsItemWrapper}>
          {products?.map((product) => {
            return (
              <li
                key={product?.hotelId}
                className={styles.catalogueProductsItem}
              >
                <ProductCard {...product} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.catalogueProductsItemWrapperWithoutData}>
          <Typography fontSize="large">{`Aucune donnée disponible.`}</Typography>
        </div>
      )}
    </div>
  );
};

export default CatalogueProducts;
