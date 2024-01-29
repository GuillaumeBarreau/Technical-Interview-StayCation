export interface IProductCard {
  id: number;
  hotelId: number;
  roomId: number;
  date: string;
  name: string;
  stock: number;
  preview: string;
  pictureId: string;
  discountPrice: number;
  price: number;
  stars: number;
  reviewCount: number;
  averageScore: number;
  percentageDiscount: number;
}
export type TProductCardDetails = Pick<IProductCard, "name" | "stars" | "preview" | "reviewCount" | "averageScore">;
export type TProductCardTitle = Pick<IProductCard, "name"  >;
export type TProductCardImage = {
  src: string;
  alt: string;
};
export type TProductCardRating = Pick<IProductCard, "reviewCount" | "averageScore"  | "name" | "stars">;
export type TProductCardText = {
  children: string;
  fontSize?: "small" | "medium" | "large";
  color?: string;
};
export type TProductCardPrice = Pick<IProductCard, "discountPrice" | "price" | "percentageDiscount">;