import { querySelectLastSafeDate } from "../sale_dates/sale_dates.service.js";
import { queryMatchingRoomBookings } from "./booking.service.js";

export const getBookingAvailable = async ({ roomId, stock }) => {
  const { id: saleId } = await querySelectLastSafeDate();

  const response = await queryMatchingRoomBookings({
    roomId,
    stock,
    saleId,
  });

  const { matchingCount } = response;

  return {
    matchingCount,
  };
};
