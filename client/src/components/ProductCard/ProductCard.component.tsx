import { IProductCard } from "./ProductCard.types";
import ProductCardImage from "./ProductCardImage/ProductCardImage.component";
import ProductCardDetails from "./ProductCardDetails/ProductCardDetails.component";
import ProductCardPrice from "./ProductCardPrice/ProductCardPrice.component";
import styles from "./ProductCard.module.scss";
import BookingCard from "../BookingCard/BookingCard.component";
import { useState } from "react";

const ProductCard = (props: IProductCard) => {
  const [openBookingCard, setOpenBookingCard] = useState(false);

  const {
    name,
    stars,
    stock,
    preview,
    pictureId,
    discountPrice,
    reviewCount,
    averageScore,
    price,
    percentageDiscount,
    saleId,
    roomId,
    matchingCount,
  } = props;

  const stockIfAvailable = stock - matchingCount > 0 ? true : false;

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

  const BookingCardProps = {
    saleId,
    roomId,
  };

  return (
    <div
      className={`${styles.productCardWrapper} ${!stockIfAvailable && styles.productCardWrapperDisabled}`}
      onClick={() =>
        stockIfAvailable &&
        setOpenBookingCard((openBookingCard) => !openBookingCard)
      }
    >
      <ProductCardImage {...ProductCardImageProps} />
      <ProductCardDetails {...ProductCardDetailsProps} />
      <ProductCardPrice {...ProductCardPriceProps} />
      {openBookingCard && <BookingCard {...BookingCardProps}></BookingCard>}
    </div>
  );
};

export default ProductCard;
