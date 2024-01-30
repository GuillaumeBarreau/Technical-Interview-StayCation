import { render } from "@testing-library/react";
import Component from "./BookingCard.component";
import { IBookingCard } from "./BookingCard.types";

const props: IBookingCard = {
  saleId: 14,
  roomId: 24,
  stock: 42,
};

// jest.mock("./ProductCardImage/ProductCardImage.component", () => () => {
//   const ComponentMock = <div>ProductCardImage</div>;
//   return ComponentMock;
// });

// jest.mock("./ProductCardDetails/ProductCardDetails.component", () => () => {
//   const ComponentMock = <div>ProductCardDetails</div>;
//   return ComponentMock;
// });

// jest.mock("./ProductCardPrice/ProductCardPrice.component", () => () => {
//   const ComponentMock = <div>ProductCardPrice</div>;
//   return ComponentMock;
// });

const setup = ({ ...overrideProps }) => {
  return render(<Component {...props} {...overrideProps}></Component>);
};

describe("Test ProductCard component", () => {
  it("should render the component", () => {
    const { container } = setup({ ...props });
    expect(container).toBeInTheDocument();
  });

  // it("should contain all children component", () => {
  //   const { getByText } = setup({ ...props });
  //   expect(getByText("ProductCardImage")).toBeInTheDocument();
  //   expect(getByText("ProductCardDetails")).toBeInTheDocument();
  //   expect(getByText("ProductCardPrice")).toBeInTheDocument();
  // });
});
