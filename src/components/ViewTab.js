import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import { LIST_VIEW, CHART_VIEW } from "../utility";
import "./style.scss";

const ViewTab = ({ activeTab, onTabChange }) => (
  <ul className="view-tab nav nav-tabs nav-fill my-4">
    <li className="nav-item">
      <a
        className={`nav-link ${activeTab === LIST_VIEW ? "active" : ""}`}
        onClick={event => {
          event.preventDefault();
          onTabChange(LIST_VIEW);
        }}
      >
        <Ionicon className="rounded-circle ios-paper mr-2" icon="ios-paper" />
        列表模式
      </a>
    </li>
    <li className="nav-item">
      <a
        className={`nav-link ${activeTab === CHART_VIEW ? "active" : ""}`}
        onClick={event => {
          event.preventDefault();
          onTabChange(CHART_VIEW);
        }}
      >
        <Ionicon className="rounded-circle ios-pie mr-2" icon="ios-pie" />
        图表模式
      </a>
    </li>
  </ul>
);

ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default ViewTab;
