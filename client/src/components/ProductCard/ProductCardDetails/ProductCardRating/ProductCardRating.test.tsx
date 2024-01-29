import { render } from "@testing-library/react";
import Component from "./ProductCardRating.component";
import { TProductCardRating } from "../../ProductCard.types";

const props: TProductCardRating = {
  reviewCount: 14,
  averageScore: 97,
  name: "ProductCardRating name",
  stars: 3,
};

const setup = ({ ...overrideProps }) => {
  return render(<Component {...props} {...overrideProps}></Component>);
};

describe("Test ProductCardRating component", () => {
  it("should render the component", () => {
    const { container } = setup({ ...props });
    expect(container).toBeInTheDocument();
  });

  it("should contain a [reviewCount] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.reviewCount}`);
  });

  it("should contain a [averageScore] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.averageScore}`);
  });

  it("should contain a [name] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.name}`);
  });

  it("should contain a [stars] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`***`);
  });

  it("should return an Empty DOM element if [reviewCount], [averageScore] and [name] props is empty", () => {
    const { container } = setup({
      reviewCount: undefined,
      averageScore: undefined,
      name: undefined,
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("should contain a value '+50' is [reviewCount] props is > to value 50", () => {
    const { container } = setup({
      reviewCount: 60,
    });
    expect(container).toHaveTextContent(`+50`);
  });

  it("should not contain [reviewCount] props is [reviewCount] props is empty", () => {
    const { container } = setup({
      reviewCount: undefined,
    });
    expect(container).not.toHaveTextContent(`${props.reviewCount}`);
  });

  it("should not contain [averageScore] props is [averageScore] props is empty", () => {
    const { container } = setup({
      averageScore: undefined,
    });
    expect(container).not.toHaveTextContent(`${props.averageScore}`);
  });
});
