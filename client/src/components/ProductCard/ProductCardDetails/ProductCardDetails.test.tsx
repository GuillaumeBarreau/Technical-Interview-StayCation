import { render } from "@testing-library/react";
import Component from "./ProductCardDetails.component";
import { TProductCardDetails } from "../ProductCard.types";

const props: TProductCardDetails = {
  name: "ProductCardDetails name",
  stars: 1,
  preview: "ProductCardDetails preview",
  reviewCount: 14,
  averageScore: 97,
};

const setup = ({ ...overrideProps }) => {
  return render(<Component {...props} {...overrideProps}></Component>);
};

describe("Test ProductCard component", () => {
  it("should render the component", () => {
    const { container } = setup({ ...props });
    expect(container).toBeInTheDocument();
  });

  it("should contain a [name] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.name}`);
  });

  it("should contain a [preview] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.preview}`);
  });

  it("should contain a [reviewCount] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.reviewCount}`);
  });
});
