import camelCase from "camelcase-keys";
import DB from "../../../client-pg.js";

export const queryCountStockAvailable = async ({ roomId, stock, saleId }) => {
  const query = `
    WITH SaleDatesRange AS (
        SELECT start_date, end_date
        FROM public.sale_dates
        WHERE id = $3
    ),

    BookingsMatching AS (
        SELECT COUNT(*) AS match_count
        FROM public.bookings b
        JOIN SaleDatesRange sdr ON b.date BETWEEN sdr.start_date AND sdr.end_date
        WHERE b.room_id = $1 
    )
      
    SELECT 
        $2 - match_count AS remaining_stock
    FROM BookingsMatching;
  `;

  const { rows } = await DB.query(query, [roomId, stock, saleId]);

  return camelCase(rows[0]);
};
