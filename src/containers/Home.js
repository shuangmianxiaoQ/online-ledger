import React, { Fragment, Component } from "react";
import MonthPicker from "../components/MonthPicker";
import PriceSubtotal from "../components/PriceSubtotal";
import ViewTab from "../components/ViewTab";
import CreateBtn from "../components/CreateBtn";
import PriceList from "../components/PriceList";
import { LIST_VIEW, getCurrentDate } from "../utility";

export const category = {
  "1": {
    cid: 1,
    name: "旅行",
    type: "outcome",
    iconName: "ios-plane"
  },
  "2": {
    cid: 2,
    name: "理财",
    type: "income",
    iconName: "logo-usd"
  }
};

export const items = [
  {
    id: 1,
    title: "去云南旅游",
    price: 2000,
    date: "2019-04-05",
    cid: 1
  },
  {
    id: 2,
    title: "去甘肃旅游",
    price: 4000,
    date: "2019-06-05",
    cid: 1
  },
  {
    id: 3,
    title: "理财收入",
    price: 5000,
    date: "2019-05-10",
    cid: 2
  }
];

export const newItem = {
  id: 4,
  title: "加班工资",
  price: 500,
  date: "2019-05-29",
  cid: 2
};

// 获取列表项，类似数据库外键关联查询
const getPriceItems = (items, currentDate) => {
  const { year, month } = currentDate;

  return items
    .map(item => ({ ...item, category: category[item.cid] }))
    .filter(item =>
      item.date.includes(`${year}-${String(month).padStart(2, "0")}`)
    );
};

// 计算总收入和总支出
const computedSubtotal = items =>
  items.reduce(
    (acc, { category, price }) => {
      acc[category.type === "income" ? 0 : 1] += price;
      // 先计算值，再返回`acc`累加数组
      return acc;
    },
    [0, 0]
  );

class Home extends Component {
  state = {
    items,
    currentDate: getCurrentDate(),
    tabView: LIST_VIEW
  };

  changeDate = (year, month) => {
    this.setState(() => ({ currentDate: { year, month } }));
  };

  changeView = view => this.setState(() => ({ tabView: view }));

  createItem = () =>
    this.setState(prevState => ({ items: [newItem, ...prevState.items] }));

  modifyItem = modifiedItem =>
    this.setState(prevState => ({
      items: prevState.items.map(item =>
        item.id === modifiedItem.id ? { ...item, title: "更新后的标题" } : item
      )
    }));

  // 使用数组`filter`方法进行过滤删除
  deleteItem = deletedItem =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== deletedItem.id)
    }));

  render() {
    const { items, currentDate, tabView } = this.state;
    const priceItems = getPriceItems(items, currentDate);
    const [totalIncome, totaloutcome] = computedSubtotal(priceItems);

    return (
      <Fragment>
        <div className="row p-3">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month}
              onChange={this.changeDate}
            />
          </div>
          <div className="col pt-4">
            <PriceSubtotal income={totalIncome} outcome={totaloutcome} />
          </div>
        </div>

        <div className="content-area p-3">
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW ? (
            <PriceList
              items={priceItems}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          ) : (
            <div className="chart-tab">图表模式</div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;
