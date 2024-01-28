import ProductCard from "../ProductCard/ProductCard.component";
import styles from "./CatalogueProducts.module.scss";
import { useEffect, useState } from "react";
import { IProductCard } from "../ProductCard/ProductCard.types";

const CatalogueProducts = () => {
  const [products, setProducts] = useState<IProductCard[] | []>([]);

  useEffect(() => {
    fetch("http://localhost:9000/hotels")
      .then(
        async (res: {
          json: () => IProductCard[] | PromiseLike<IProductCard[]>;
        }) => {
          const result = await res.json();
          setProducts(result);
        }
      )
      .catch((e) => console.warn("Error: ", e));
  }, []);

  return (
    <div className={styles.catalogueProductsWrapper}>
      {products?.length > 0 && (
        <ul className={styles.catalogueProductsItemWrapper}>
          {products?.map((product) => {
            return (
              <li key={product?.id} className={styles.catalogueProductsItem}>
                <ProductCard {...product} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CatalogueProducts;
