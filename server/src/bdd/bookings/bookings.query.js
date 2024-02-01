import camelCase from "camelcase-keys";
import DB from "../../../client-pg.js";

export const queryMatchingRoomBookings = async ({ roomId, saleId }) => {
  const query = `
      WITH SaleDatesRange AS (
        SELECT start_date, end_date
        FROM public.sale_dates
        WHERE id = $2
    )

    SELECT COUNT(*) AS matching_count
    FROM public.bookings AS b
    JOIN SaleDatesRange AS sdr ON b.date BETWEEN sdr.start_date AND sdr.end_date
    WHERE b.room_id = $1;
  `;

  const { rows } = await DB.query(query, [roomId, saleId]);

  return camelCase(rows[0]);
};

export const bookingsQuery = {
  queryMatchingRoomBookings,
};
