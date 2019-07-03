import React from "react";
import { shallow } from "enzyme";
import Ionicon from "react-ionicons";
import PriceList from "../PriceList";
import { category, items } from "../../containers/Home";

const priceItems = items.map(item => ({
  ...item,
  category: category[item.cid]
}));

const props = {
  items: priceItems,
  onModifyItem: jest.fn(), // 创建一个`mock`函数
  onDeleteItem: jest.fn()
};

let wrapper;

describe("Test PriceList Component", () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />);
  });

  it.skip("Should render the component to match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render correct price items length", () => {
    expect(wrapper.find(".list-group-item").length).toEqual(priceItems.length);
  });

  it("Should render correct icon for each item", () => {
    const iconList = wrapper
      .find(".list-group-item")
      .first()
      .find(Ionicon);

    expect(iconList.length).toEqual(3);
    expect(iconList.first().props().icon).toEqual(
      priceItems[0].category.iconName
    );
  });

  it("Should Trigger the correct function callbacks", () => {
    const firstItem = wrapper
      .find(".list-group-item")
      .first()
      .find("a");

    // 模拟添加一个点击事件
    firstItem.first().simulate("click");
    expect(props.onModifyItem).toHaveBeenCalledWith(priceItems[0]);

    firstItem.last().simulate("click");
    expect(props.onDeleteItem).toHaveBeenCalledWith(priceItems[0]);
  });
});
