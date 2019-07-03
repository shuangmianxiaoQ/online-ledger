import React from "react";
import { mount } from "enzyme";
import MonthPicker from "../MonthPicker";

const props = {
  year: 2019,
  month: 5,
  onChange: jest.fn()
};

let wrapper;

describe("Test MonthPicker Component", () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />);
  });

  it("Should render the correct default date, show correct dropdown initial state", () => {
    expect(wrapper.find(".dropdown-toggle").text()).toEqual("2019年 05月");
    expect(wrapper.find(".dropdown-menu").length).toEqual(0);
    expect(wrapper.state("visible")).toEqual(false);
    expect(wrapper.state("selectedYear")).toEqual(props.year);
  });

  it("After click the button, dropdown should open, and render correct year & month list", () => {
    wrapper.find(".dropdown-toggle").simulate("click");

    expect(wrapper.state("visible")).toEqual(true);
    expect(wrapper.find(".dropdown-menu").length).toEqual(1);
    expect(wrapper.find(".year-range .dropdown-item").length).toEqual(9);
    expect(wrapper.find(".month-range .dropdown-item").length).toEqual(12);
    expect(wrapper.find(".year-range .active").text()).toEqual("2019 年");
    expect(wrapper.find(".month-range .active").text()).toEqual("05 月");
    expect(
      wrapper
        .find(".year-range .dropdown-item")
        .first()
        .text()
    ).toEqual(`${props.year - 4} 年`);
    expect(
      wrapper
        .find(".month-range .dropdown-item")
        .first()
        .text()
    ).toEqual("01 月");
  });

  it("Click the year & month, should trigger the correct status and behavier", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    wrapper
      .find(".year-range .dropdown-item")
      .first()
      .simulate("click");

    expect(
      wrapper
        .find(".year-range .dropdown-item")
        .first()
        .hasClass("active")
    ).toEqual(true);
    expect(wrapper.state("selectedYear")).toEqual(props.year - 4);

    wrapper
      .find(".month-range .dropdown-item")
      .last()
      .simulate("click");

    expect(wrapper.state("visible")).toEqual(false);
    expect(props.onChange).toHaveBeenCalledWith(2015, 12);
  });

  it("Click the dropdown outer, should close the dropdown", () => {
    const eventMap = {};

    // 添加模拟监听事件
    document.addEventListener = jest.fn((event, callback) => {
      eventMap[event] = callback;
    });

    // 因为监听事件在`componentDidMount`中，所以不能用`beforeEach`中的`wrapper`
    const wrapper = mount(<MonthPicker {...props} />);

    wrapper.find(".dropdown-toggle").simulate("click");
    // 在`documnet.body`上点击时，关闭弹出层
    eventMap.click({ target: document.body });
    expect(wrapper.state("visible")).toEqual(false);

    wrapper.find(".dropdown-toggle").simulate("click");
    // 在弹出层上点击时，不关闭弹出层
    eventMap.click({
      target: wrapper.find(".dropdown-menu").getDOMNode()
    });
    expect(wrapper.state("visible")).toEqual(true);
  });
});
