export interface IProductCard {
  id: number;
  name: string;
  preview: string;
  pictureId: string;
  discountPrice: number;
  stars: number;
  reviewCount: number;
  averageScore: number;
}

export type TProductCardDetails = Pick<IProductCard, "name" | "stars" | "preview" | "discountPrice"  | "reviewCount" | "averageScore">;
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
