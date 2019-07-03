import React from "react";
import { mount } from "enzyme";
import Home, { newItem } from "../Home";
import MonthPicker from "../../components/MonthPicker";
import PriceSubtotal from "../../components/PriceSubtotal";
import ViewTab from "../../components/ViewTab";
import CreateBtn from "../../components/CreateBtn";
import PriceList from "../../components/PriceList";
import { LIST_VIEW, CHART_VIEW, getCurrentDate } from "../../utility";

let wrapper;

describe("Test Home COmponent", () => {
  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  it("Should render the default layout", () => {
    const currentDate = getCurrentDate();

    expect(wrapper.find(MonthPicker).length).toEqual(1);
    expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year);
    expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month);
    expect(wrapper.find(PriceSubtotal).length).toEqual(1);
    expect(wrapper.find(ViewTab).length).toEqual(1);
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW);
    expect(wrapper.find(CreateBtn).length).toEqual(1);
    expect(wrapper.find(PriceList).length).toEqual(1);
    expect(wrapper.find(PriceList).props().items.length).toEqual(0);
  });

  it("Click the other view tab, should change the view type", () => {
    wrapper
      .find(".nav-item a")
      .last()
      .simulate("click");

    expect(wrapper.find(PriceList).length).toEqual(0);
    expect(wrapper.find(".chart-tab").length).toEqual(1);
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW);
  });

  it("Switch the month, should render correct price list items", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    wrapper
      .find(".month-range .dropdown-item")
      .at(3)
      .simulate("click");

    expect(wrapper.find(MonthPicker).props().month).toEqual(4);
    expect(wrapper.find(PriceList).props().items.length).toEqual(1);
  });

  it("Click the create button, should create the new item", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    wrapper
      .find(".month-range .dropdown-item")
      .at(4)
      .simulate("click");
    wrapper.find(".create-btn").simulate("click");

    expect(wrapper.find(PriceList).props().items.length).toEqual(2);
    expect(wrapper.state("items")[0]).toEqual(newItem);
  });
});
