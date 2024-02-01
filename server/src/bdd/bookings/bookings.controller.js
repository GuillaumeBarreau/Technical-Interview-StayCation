import { saleDatesQuery } from "../sale_dates/sale_dates.query.js";
import { bookingsQuery } from "./bookings.query.js";

export const getBookingAvailable = async ({ roomId, stock }) => {
  const { id: saleId } = await saleDatesQuery.querySelectLastSafeDate();

  const response = await bookingsQuery.findAndCountRoomBookings({
    roomId,
    stock,
    saleId,
  });

  const { matchingCount } = response;

  return {
    matchingCount,
  };
};

export const bookingsControllers = {
  getBookingAvailable,
};
