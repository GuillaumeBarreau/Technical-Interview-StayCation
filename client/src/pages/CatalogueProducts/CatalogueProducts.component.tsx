import { IProductCard } from '@/components/ProductCard/ProductCard.types';
import ProductCard from '@/components/ProductCard/ProductCard.component';
import styles from './CatalogueProducts.module.scss';
import { useEffect, useState } from 'react';

const CatalogueProducts = () => {
  const [products, setProducts] = useState<IProductCard[] | []>([]);

  useEffect(() => {
    fetch(`http://localhost:9000/last-hotels-package`)
      .then(async (res) => {
        const result = await res.json();
        setProducts(result);
      })
      .catch((e) => console.warn('Error: ', e));
  }, []);

  return (
    <div className={styles.catalogueProductsWrapper}>
      {products?.length > 0 && (
        <ul className={styles.catalogueProductsItemWrapper}>
          {products?.map((product) => {
            return (
              <li key={product?.hotelId} className={styles.catalogueProductsItem}>
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
