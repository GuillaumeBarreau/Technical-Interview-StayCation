import { useQuery } from "@tanstack/react-query";
import { IBookingCard, IOpening } from "./BookingCard.types";
import styles from "./BookingCard.module.scss";
import { formatDate } from "./BookingCard.utils";
import Typography from "../Typography/Typography.component";
import ProductCardPrice from "../ProductCard/ProductCardPrice/ProductCardPrice.component";
import { fetchOpenings } from "@/api/openings.api";
import { BookingCardSkeleton } from "./BookingCard.skeleton";

const BookingCard = (props: IBookingCard) => {
  const { saleId, roomId } = props;
  const { data, isLoading, isError } = useQuery({
    queryKey: [`bookings_${saleId}_${roomId}`],
    queryFn: (): Promise<IOpening[]> =>
      fetchOpenings.openingsAvailableByRoomId({ saleId, roomId }),
    initialData: [],
  });

  if (isError) {
    return (
      <Typography fontSize="large">{`Aucune donnée disponible.`}</Typography>
    );
  }

  return (
    <div className={styles.bookingCardWrapper}>
      <div className={styles.bookingCardContent}>
        {!isLoading && data.length > 0 ? (
          data.map((opening) => {
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
          <div className={styles.bookingCardWrapper}>
            <div className={styles.bookingCardContent}>
              <BookingCardSkeleton />
              <br />
              <Typography fontSize="large">{`Requête en cours...`}</Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
