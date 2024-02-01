import { bookingsQuery } from "../bookings/bookings.query.js";
import { hotelsQuery } from "./hotels.query.js";
import { saleDatesQuery } from "../sale_dates/sale_dates.query.js";
import { calculatePercentageDiscount } from "../../../utils/utils.js";

const getHotelsDataBySaleId = async (saleId) => {
  const hotelInformation =
    await hotelsQuery.findDistinctHotelsDataBySaleId(saleId);
  return hotelInformation;
};

const getLastPackageHotels = async () => {
  const { id: saleId } = await saleDatesQuery.querySelectLastSafeDate();
  const hotelInformation =
    await hotelsQuery.findDistinctHotelsDataBySaleId(saleId);

  const parseData = async (hotelInformation) => {
    const parsedData = await Promise.all(
      hotelInformation.map(async (details) => {
        const { id, preview, ...rest } = details;

        const { matchingCount } = await bookingsQuery.findAndCountRoomBookings({
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

export const hotelsControllers = {
  getLastPackageHotels,
  getHotelsDataBySaleId,
};
