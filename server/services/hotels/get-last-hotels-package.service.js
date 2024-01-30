import camelCase from "camelcase-keys";
import DB from "../../client-pg.js";
import { calculatePercentageDiscount } from "../../utils/utils.js";
import { getBookingAvailable } from "../booking/get-booking.service.js";

export const queryLastSafeId = async () => {
  const query = `
    SELECT id
    FROM public.sale_dates
    ORDER BY id DESC
    LIMIT 1
  `;

  const { rows } = await DB.query(query);

  return camelCase(rows[0].id);
};

const queryRoomMinPrices = async (saleId) => {
  const query = `
    SELECT room_id, MIN(price) AS price, MIN(discount_price) AS discount_price
    FROM public.openings
    WHERE sale_id = $1
      AND stock > 0
    GROUP BY room_id
  `;

  const { rows } = await DB.query(query, [saleId]);

  return camelCase(rows);
};

const queryHotelDetails = async (saleId) => {
  // TODO : This query does not return the room with the cheapest price.
  // A correction needs to be made to it.
  // Using DISTINCT ON guarantees only one row per hotel, but the price is incorrect.
  const query = `
    SELECT DISTINCT ON (hotels.id) hotels.*, rooms.hotel_id, openings.*, reviews.review_count, reviews.average_score
    FROM public.openings AS openings
    JOIN public.rooms AS rooms ON openings.room_id = rooms.id
    JOIN public.hotels AS hotels ON rooms.hotel_id = hotels.id
    LEFT JOIN (
        SELECT hotel_id, COUNT(id) AS review_count, AVG(score) AS average_score
        FROM public.reviews
        GROUP BY hotel_id
    ) AS reviews ON hotels.id = reviews.hotel_id
    WHERE openings.sale_id = $1
  `;

  const { rows } = await DB.query(query, [saleId]);

  return camelCase(rows);
};

const getLastHotelsPackage = async (saleId) => {
  // const minPrices = await queryRoomMinPrices(saleId);
  const hotelInformation = await queryHotelDetails(saleId);

  return hotelInformation;
};

export const getHotelsPackagesData = async () => {
  const lastSaleId = await queryLastSafeId();
  const hotelInformation = await getLastHotelsPackage(lastSaleId);

  const parseData = async (hotelInformation) => {
    const parsedData = await Promise.all(
      hotelInformation.map(async (details) => {
        const { id, preview, ...rest } = details;
        const { bookingAvailable } = await getBookingAvailable(
          details.roomId,
          details.stock
        );

        return {
          ...rest,
          averageScore: details.averageScore.toFixed(1),
          preview: details.preview.replace(/\+/g, "◦"),
          percentageDiscount: calculatePercentageDiscount(
            details.discountPrice,
            details.price
          ),
          bookingAvailable,
        };
      })
    );

    return parsedData;
  };

  const result = await parseData(hotelInformation)
    .then((parsedData) => {
      return parsedData;
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
};
