import camelCase from "camelcase-keys";
import DB from "../../../client-pg.js";

const findOpeningsByRoomID = async ({ saleId, roomId }) => {
  const query = `
    SELECT *
    FROM public.openings o
    WHERE sale_id = $1
      AND room_id = $2
      AND stock > 0
      AND NOT EXISTS (
          SELECT 1
          FROM public.bookings b
          WHERE b.date = o.date
            AND b.room_id = o.room_id
      )
    ORDER BY o.date DESC;
  `;

  const { rows } = await DB.query(query, [saleId, roomId]);
  return camelCase(rows);
};

export const openingsQuery = {
  findOpeningsByRoomID,
};
