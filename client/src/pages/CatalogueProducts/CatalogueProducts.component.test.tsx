import { render } from "@testing-library/react";
import Component from "./CatalogueProducts.component";

const setup = ({ ...overrideProps }) => {
  return render(<Component {...overrideProps}></Component>);
};

describe("Test CatalogueProducts component", () => {
  it("should render the component", () => {
    const { container } = setup({});
    expect(container).toBeInTheDocument();
  });
});
