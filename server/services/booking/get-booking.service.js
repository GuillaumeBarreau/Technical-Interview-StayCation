import camelCase from "camelcase-keys";
import { queryLastSafeId } from "../hotels/get-last-hotels-package.service.js";
import DB from "../../client-pg.js";

const queryBooking = async (roomId, stock, saleId) => {
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
        CASE 
            WHEN match_count >= $2 THEN false
            ELSE true
        END AS booking_available
    FROM BookingsMatching;
  `;

  const { rows } = await DB.query(query, [roomId, stock, saleId]);
  return camelCase(rows[0]);
};

export const getBookingAvailable = async (roomId, stock) => {
  const lastSaleId = await queryLastSafeId();
  const { bookingAvailable } = await queryBooking(roomId, stock, lastSaleId);
  return {
    bookingAvailable,
  };
};
