import { useEffect, useState } from "react";
import { IBookingCard } from "./BookingCard.types";
import styles from "./BookingCard.module.scss";
import { formatDate } from "./BookingCard.utils";
import Typography from "../Typography/Typography.component";
import ProductCardPrice from "../ProductCard/ProductCardPrice/ProductCardPrice.component";

const BookingCard = (props: IBookingCard) => {
  const { saleId, roomId } = props;

  const [openingsData, setOpeningsData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:9000/openings/${saleId}/${roomId}`
      );
      const result = await res.json();
      setOpeningsData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.bookingCardWrapper}>
      <div className={styles.bookingCardContent}>
        {openingsData.length > 0 ? (
          openingsData.map((opening) => {
            const {
              price,
              discountPrice,
              percentageDiscount,
              id,
              stock,
              date,
            } = opening;

            return (
              <div className={styles.bookingCardDetailsContent} key={id}>
                <div className={styles.bookingCardDetailsStock}>
                  <Typography fontSize="small">{`${stock} reservations disponible.`}</Typography>
                </div>
                <div className={styles.bookingCardDetailsDate}>
                  {`Le ${formatDate(date)}`}
                </div>
                <div className={styles.bookingCardDetailsPrice}>
                  <ProductCardPrice
                    price={price}
                    discountPrice={discountPrice}
                    percentageDiscount={percentageDiscount}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <Typography fontSize="large">{`Aucune donnée disponible.`}</Typography>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
