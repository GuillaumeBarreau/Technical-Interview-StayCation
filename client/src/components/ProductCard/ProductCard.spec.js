import React from "react";
import { ProductCard } from "./ProductCard.component";
import { shallow } from "enzyme";

describe("ProductCard", () => {
  it("should not throw an error", () => {
    expect(shallow(<ProductCard />)).toBeTruthy();
  });

  it("should contain ProductCard props ", () => {
    expect(
      shallow(<ProductCard>CardProduct children</ProductCard>).debug()
    ).toContain("typogrpahy_children");
  });
});
