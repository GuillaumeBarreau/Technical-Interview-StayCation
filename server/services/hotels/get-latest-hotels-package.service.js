import camelCase from "camelcase-keys";
import DB from "../../client-pg.js";

const querySelectLastSaleId = `
  SELECT id
  FROM public.sale_dates
  ORDER BY id DESC
  LIMIT 1
`;

export const getLatestHotelsPackage = async () => {
  const query = `
    WITH last_sale_id AS (
      ${querySelectLastSaleId}
    )

    SELECT DISTINCT ON (hotels.id) hotels.*, rooms.hotel_id, openings.*, reviews.review_count, reviews.average_score
    FROM public.openings AS openings
    JOIN (
        SELECT room_id, MIN(price) AS min_price, MIN(discount_price) AS min_discount_price
        FROM public.openings
        WHERE sale_id = (SELECT id FROM last_sale_id) 
          AND stock > 0
        GROUP BY room_id
    ) AS min_prices ON openings.room_id = min_prices.room_id AND openings.price = min_prices.min_price AND openings.discount_price = min_prices.min_discount_price
    JOIN public.rooms AS rooms ON openings.room_id = rooms.id
    JOIN public.hotels AS hotels ON rooms.hotel_id = hotels.id
    LEFT JOIN (
        SELECT hotel_id, COUNT(id) AS review_count, AVG(score) AS average_score
        FROM public.reviews
        GROUP BY hotel_id
    ) AS reviews ON hotels.id = reviews.hotel_id
    WHERE openings.sale_id = (SELECT id FROM last_sale_id);
  `;

  const { rows } = await DB.query(query);

  return camelCase(rows);
};
