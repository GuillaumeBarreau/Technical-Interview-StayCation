import { IProductCard } from "./ProductCard.types";
import ProductCardImage from "./ProductCardImage/ProductCardImage.component";
import ProductCardDetails from "./ProductCardDetails/ProductCardDetails.component";
import ProductCardPrice from "./ProductCardPrice/ProductCardPrice.component";
import styles from "./ProductCard.module.scss";
import { useEffect, useState } from "react";

const ProductCard = (props: IProductCard) => {
  const [available, setAvailable] = useState<boolean>(true);
  const { roomId, stock } = props;
  const fetchBookingData = async ({
    roomId,
    stock,
  }: {
    roomId: number;
    stock: number;
  }) => {
    try {
      const res = await fetch(
        `http://localhost:9000/booking/${roomId}/${stock}`
      );
      const { bookingAvailable } = await res.json();
      setAvailable(bookingAvailable);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchBookingData({ roomId, stock });
  }, []);

  const {
    name,
    stars,
    preview,
    pictureId,
    discountPrice,
    reviewCount,
    averageScore,
    price,
    percentageDiscount,
  } = props;

  const ProductCardDetailsProps = {
    name,
    stars,
    preview,
    reviewCount,
    averageScore,
  };

  const ProductCardImageProps = {
    src: pictureId,
    alt: name,
  };

  const ProductCardPriceProps = {
    discountPrice,
    price,
    percentageDiscount,
  };

  return (
    <div
      className={`${styles.productCardWrapper} ${available ? "" : styles.productCardWrapperDisabled}`}
    >
      <ProductCardImage {...ProductCardImageProps} />
      <ProductCardDetails {...ProductCardDetailsProps} />
      <ProductCardPrice {...ProductCardPriceProps} />
    </div>
  );
};

export default ProductCard;
