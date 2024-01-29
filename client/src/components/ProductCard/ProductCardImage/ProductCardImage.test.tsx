import { render } from "@testing-library/react";
import Component from "./ProductCardImage.component";
import { TProductCardImage } from "../ProductCard.types";

const props: TProductCardImage = {
  alt: "ProductCardImage alt",
  src: "ProductCardImage src",
};

const setup = ({ ...overrideProps }) => {
  return render(<Component {...props} {...overrideProps}></Component>);
};

describe("Test ProductCardImage component", () => {
  it("should render the component", () => {
    const { container } = setup({ ...props });
    expect(container).toBeInTheDocument();
  });

  it("should contain a [alt] Props", () => {
    const { getByAltText } = setup({ ...props });
    const imageElement = getByAltText(props.alt);
    expect(imageElement).toHaveAttribute("alt", props.alt);
  });

  it("should contain a [src] Props", () => {
    const { getByAltText } = setup({ ...props });
    const imageElement = getByAltText(props.alt);
    expect(imageElement).toHaveAttribute("src", props.src);
  });
});
