export const calculatePercentageDiscount = (discountPrice, price) => {
  const percentage = (discountPrice / price) * 100;
  return Number((100 - percentage).toFixed());
};
