export interface IBookingCard {
    saleId: number; 
    roomId: number;
}

export type IOpening = {
    id: number;
    date: Date;
    stock: number;
    price: number;
    discountPrice: number;
    percentageDiscount: number;
}