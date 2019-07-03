import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "../utility";

class MonthPicker extends Component {
  state = {
    visible: false,
    // 选中的年份，初始值为父组件传递过来的年份
    selectedYear: this.props.year
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick = event => {
    // 如果点击在按钮或弹出层上，则不关闭弹出层
    if (
      this.btnNode.contains(event.target) ||
      this.popupNode.contains(event.target)
    ) {
      return;
    }

    this.setState(() => ({ visible: false }));
  };

  toggleDropdown = event => {
    event.preventDefault();
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  // 选择年份时的回调
  selectYear = (event, year) => {
    event.preventDefault();
    this.setState(() => ({ selectedYear: year }));
  };

  // 选择月份时的回调
  selectMonth = (event, month) => {
    event.preventDefault();
    this.setState(() => ({ visible: false }));
    this.props.onChange(this.state.selectedYear, month);
  };

  render() {
    const { year, month } = this.props;
    const { visible, selectedYear } = this.state;
    const yearRange = range(9, -4).map(item => item + year);
    const monthRange = range(12, 1);

    return (
      <div className="dropdown month-picker">
        <h5>选择月份</h5>
        <button
          className="btn btn-secondary dropdown-toggle"
          ref={ref => (this.btnNode = ref)}
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${String(month).padStart(2, "0")}月`}
        </button>

        {visible && (
          <div
            className="dropdown-menu"
            style={{ display: "block" }}
            ref={ref => (this.popupNode = ref)}
          >
            <div className="row">
              <div className="col border-right year-range">
                {yearRange.map(item => (
                  <a
                    key={item}
                    className={`dropdown-item ${
                      item === selectedYear ? "active" : ""
                    }`}
                    onClick={event => this.selectYear(event, item)}
                  >
                    {item} 年
                  </a>
                ))}
              </div>

              <div className="col month-range">
                {monthRange.map(item => (
                  <a
                    key={item}
                    className={
                      item === month ? "dropdown-item active" : "dropdown-item"
                    }
                    onClick={event => this.selectMonth(event, item)}
                  >
                    {String(item).padStart(2, "0")} 月
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MonthPicker;
