import { queryMatchingRoomBookings } from "../bookings/booking.service.js";
import { querySelectHotelDetails } from "./hotels.service.js";
import { querySelectLastSafeDate } from "../sale_dates/sale_dates.service.js";
import { calculatePercentageDiscount } from "../../../utils/utils.js";

const getHotelDetails = async (saleId) => {
  const hotelInformation = await querySelectHotelDetails(saleId);
  return hotelInformation;
};

export const getLastPackageHotels = async () => {
  const { id: saleId } = await querySelectLastSafeDate();
  const hotelInformation = await getHotelDetails(saleId);

  const parseData = async (hotelInformation) => {
    const parsedData = await Promise.all(
      hotelInformation.map(async (details) => {
        const { id, preview, ...rest } = details;

        const { matchingCount } = await queryMatchingRoomBookings({
          roomId: details.roomId,
          stock: details.stock,
          saleId,
        });

        return {
          ...rest,
          matchingCount,
          averageScore: details.averageScore.toFixed(1),
          preview: details.preview.replace(/\+/g, "◦"),
          percentageDiscount: calculatePercentageDiscount(
            details.discountPrice,
            details.price
          ),
        };
      })
    );

    return parsedData;
  };

  const result = await parseData(hotelInformation)
    .then((parsedData) => {
      return parsedData;
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
};
