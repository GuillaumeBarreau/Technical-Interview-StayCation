const hotelsByLastSale = async () => {

    try {
        const result = await fetch(
            `http://localhost:9000/hotels/last-sale`
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

export const fetchHotels = {
    hotelsByLastSale
}
