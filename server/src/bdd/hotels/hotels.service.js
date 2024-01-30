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
  const query = `
    SELECT DISTINCT ON (hotels.id) hotels.*, rooms.hotel_id, openings.*, reviews.review_count, reviews.average_score
    FROM public.openings AS openings
    JOIN (
        SELECT r.hotel_id, o.room_id, MIN(o.discount_price) AS min_discount_price
        FROM public.openings AS o
        JOIN public.rooms AS r ON o.room_id = r.id
        WHERE o.sale_id = $1
        GROUP BY r.hotel_id, o.room_id
    ) AS min_prices ON openings.room_id = min_prices.room_id AND openings.discount_price = min_prices.min_discount_price
    JOIN public.rooms AS rooms ON openings.room_id = rooms.id
    JOIN public.hotels AS hotels ON rooms.hotel_id = hotels.id
    LEFT JOIN (
        SELECT hotel_id, COUNT(id) AS review_count, AVG(score) AS average_score
        FROM public.reviews
        GROUP BY hotel_id
    ) AS reviews ON hotels.id = reviews.hotel_id
    WHERE openings.sale_id = $1;
  `;

  const { rows } = await DB.query(query, [saleId]);

  return camelCase(rows);
};
