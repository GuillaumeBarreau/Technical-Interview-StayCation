import { querySelectOpeningsByRoomID } from "./openings.service.js";
import { calculatePercentageDiscount } from "../../../utils/utils.js";

const getOpeningsRoom = async ({ saleId, roomId }) => {
  const response = await querySelectOpeningsByRoomID({ saleId, roomId });

  const results = response.map((details) => {
    const { price, discountPrice, ...rest } = details;

    return {
      ...rest,
      price,
      discountPrice,
      percentageDiscount: calculatePercentageDiscount(
        details.discountPrice,
        details.price
      ),
    };
  });

  return results;
};

export const openingsControllers = {
  getOpeningsRoom,
  getHotelDetails,
};
