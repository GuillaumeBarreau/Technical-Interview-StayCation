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
    SELECT DISTINCT ON (rooms.hotel_id) hotels.*, rooms.hotel_id, openings.*, reviews.review_count, reviews.average_score
    FROM public.hotels AS hotels
    JOIN public.rooms AS rooms ON hotels.id = rooms.hotel_id
    JOIN (
        SELECT DISTINCT ON (openings.room_id) *
        FROM public.openings
        WHERE sale_id = $1
          AND stock > 0
        ORDER BY openings.room_id, openings.discount_price ASC
    ) AS openings ON rooms.id = openings.room_id
    LEFT JOIN (
        SELECT hotel_id, COUNT(id) AS review_count, AVG(score) AS average_score
        FROM public.reviews
        GROUP BY hotel_id
    ) AS reviews ON rooms.hotel_id = reviews.hotel_id;
  `;
  const { rows } = await DB.query(query, [saleId]);

  return camelCase(rows);
};
