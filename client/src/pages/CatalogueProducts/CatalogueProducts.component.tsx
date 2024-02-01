import { useQuery } from "@tanstack/react-query";
import { ProductCardSkeleton } from "@/components/ProductCard/ProductCard.skeleton";
import styles from "./CatalogueProducts.module.scss";
import ProductCard from "@/components/ProductCard/ProductCard.component";
import { IProductCard } from "@/components/ProductCard/ProductCard.types";
import { fetchHotels } from "@/api/hotels.api";
import Typography from "@/components/Typography/Typography.component";

const CatalogueProducts = () => {
  const { data: products, isError } = useQuery({
    queryKey: [`hotels`],
    queryFn: (): Promise<IProductCard[]> => fetchHotels.hotelsByLastSale(),
    initialData: [],
  });

  if (isError) {
    return (
      <div className={styles.catalogueProductsItemWrapperWithoutData}>
        <Typography fontSize="large">{`Aucune donnée disponible.`}</Typography>
      </div>
    );
  }

  return (
    <div className={styles.catalogueProductsWrapper}>
      <ul className={styles.catalogueProductsItemWrapper}>
        {!isError && products?.length > 0
          ? products?.map((product) => {
              return (
                <li
                  key={product?.hotelId}
                  className={styles.catalogueProductsItem}
                >
                  <ProductCard {...product} />
                </li>
              );
            })
          : Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className={styles.catalogueProductsItem}>
                <ProductCardSkeleton />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default CatalogueProducts;
