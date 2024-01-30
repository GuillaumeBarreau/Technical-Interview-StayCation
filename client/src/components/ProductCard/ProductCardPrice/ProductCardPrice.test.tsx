import { render } from "@testing-library/react";
import Component from "./ProductCardPrice.component";
import { TProductCardPrice } from "../ProductCard.types";

const props: TProductCardPrice = {
  price: 5,
  discountPrice: 2.5,
  percentageDiscount: 50,
};

const setup = ({ ...overrideProps }) => {
  return render(<Component {...props} {...overrideProps}></Component>);
};

describe("Test ProductCard component", () => {
  it("should render the component", () => {
    const { container } = setup({ ...props });
    expect(container).toBeInTheDocument();
  });

  it("should contain a [price] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.price}`);
  });

  it("should contain a [discountPrice] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.discountPrice}`);
  });

  it("should contain a [percentageDiscount] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.percentageDiscount}`);
  });

  it("should return an Empty DOM element if [price] props is empty", () => {
    const { container } = setup({ price: undefined });
    expect(container).toBeEmptyDOMElement();
  });

  it("should not contain a [discountPrice] value if [discountPrice] props is empty", () => {
    const { container } = setup({ discountPrice: undefined });
    expect(container).not.toHaveTextContent(`${props.discountPrice}`);
  });

  it("should not contain a [percentageDiscount] value if [discountPrice] props is empty", () => {
    const { container } = setup({ discountPrice: undefined });
    expect(container).not.toHaveTextContent(`${props.percentageDiscount}`);
  });

  it("should not contain a [percentageDiscount] value if [percentageDiscount] props is empty", () => {
    const { container } = setup({ percentageDiscount: undefined });
    expect(container).not.toHaveTextContent(`${props.percentageDiscount}`);
  });
});
