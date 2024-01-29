import { useEffect, useState } from "react";
import { IProductCard } from "@/components/ProductCard/ProductCard.types";
import ProductCard from "@/components/ProductCard/ProductCard.component";
import { ProductCardSkeleton } from "@/components/ProductCard/ProductCard.skeleton";
import styles from "./CatalogueProducts.module.scss";

const CatalogueProducts = () => {
  const [products, setProducts] = useState<IProductCard[] | []>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:9000/last-hotels-package`);
      const result = await res.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.catalogueProductsWrapper}>
      <ul className={styles.catalogueProductsItemWrapper}>
        {products?.length > 0
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
