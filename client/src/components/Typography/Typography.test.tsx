import { render } from "@testing-library/react";
import Component from "./Typography.component";
import { ITypography } from "./Typography.types";

const props: ITypography = {
  children: "Typography children",
  fontSize: "small",
};

const setup = ({ ...overrideProps }) => {
  return render(<Component {...props} {...overrideProps}></Component>);
};

describe("Test Typography component", () => {
  it("should render the component", () => {
    const { container } = setup({ ...props });
    expect(container).toBeInTheDocument();
  });

  it("should contain a [Children] Props", () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.children}`);
  });

  it("should return an Empty DOM element if [Children] props is empty", () => {
    const { container } = setup({ children: undefined });
    expect(container).toBeEmptyDOMElement();
  });

  it("should add a className '.Typography--large' when fontSize is defined", () => {
    const { container } = setup({ fontSize: "large" });
    expect(container).toContainHTML("Typography--large");
  });

  it("should contain a className '.Typography--medium' when fontSize is not defined", () => {
    const { container } = setup({ fontSize: undefined });
    expect(container).toContainHTML("Typography--medium");
  });
});
