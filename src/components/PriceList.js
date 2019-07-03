import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import "./style.scss";

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="price-list list-group list-group-flush">
      {items.map(item => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
        >
          <span className="col-1 badge badge-primary">
            <Ionicon
              className="rounded-circle category-ionicion"
              icon={item.category.iconName}
            />
          </span>
          <span className="col-5">{item.title}</span>
          <span className="col-2 font-weight-bold">
            {item.category.type === "income" ? "+" : "-"}
            {item.price}元
          </span>
          <span className="col-2">{item.date}</span>
          <a className="col-1" onClick={() => onModifyItem(item)}>
            <Ionicon
              className="rounded-circle ios-create-outline"
              icon="ios-create-outline"
            />
          </a>
          <a className="col-1" onClick={() => onDeleteItem(item)}>
            <Ionicon className="rounded-circle ios-close" icon="ios-close" />
          </a>
        </li>
      ))}
    </ul>
  );
};

PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
};

export default PriceList;
