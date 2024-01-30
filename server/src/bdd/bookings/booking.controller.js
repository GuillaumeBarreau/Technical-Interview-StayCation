import { querySelectLastSafeDate } from "../sale_dates/sale_dates.service.js";
import { queryCountStockAvailable } from "./booking.service.js";

export const getBookingAvailable = async ({ roomId, stock }) => {
  const { id: saleId } = await querySelectLastSafeDate();

  const response = await queryCountStockAvailable({
    roomId,
    stock,
    saleId,
  });

  const { remainingStock } = response;

  return {
    remainingStock,
  };
};
