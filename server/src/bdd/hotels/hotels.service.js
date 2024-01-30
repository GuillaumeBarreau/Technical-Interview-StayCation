import camelCase from "camelcase-keys";
import DB from "../../../client-pg.js";

export const querySelectLowestRoomPrice = async (saleId) => {
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

export const querySelectHotelDetails = async (saleId) => {
  // TODO : This query does not return the last availability .
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
