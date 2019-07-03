import React from "react";
import { shallow } from "enzyme";
import PriceSubtotal from "../PriceSubtotal";

const props = {
  income: 2500,
  outcome: 2000
};

describe("Test PriceSubtotal Component", () => {
  it("Component should render correct income and outcome", () => {
    const wrapper = shallow(<PriceSubtotal {...props} />);

    expect(wrapper.find(".income span").text() * 1).toEqual(2500);
    expect(wrapper.find(".outcome span").text() * 1).toEqual(2000);
  });
});
