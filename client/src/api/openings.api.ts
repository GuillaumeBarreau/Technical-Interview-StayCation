import { IBookingCard } from '@/components/BookingCard/BookingCard.types';

export const openingsAvailableByRoomId = async (props: IBookingCard) => {
    const { saleId, roomId } = props;
    try {
        const result = await fetch(
            `http://localhost:9000/openings/${saleId}/${roomId}`
        );

        if (!result.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await result.json();
       
        return data;
    } catch (error) {
        throw new Error("Error fetching data");
    }
};

export const fetchOpenings = {
    openingsAvailableByRoomId
}