import { openingsQuery } from "./openings.query.js";
import { calculatePercentageDiscount } from "../../../utils/utils.js";

const getOpeningsByRoomID = async ({ saleId, roomId }) => {
  const response = await openingsQuery.findOpeningsByRoomID({
    saleId,
    roomId,
  });

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
  getOpeningsByRoomID,
};
