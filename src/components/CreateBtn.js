import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import "./style.scss";

const CreateBtn = ({ onClick }) => (
  <button className="btn btn-primary m-2 w-100 create-btn" onClick={onClick}>
    <Ionicon
      className="rounded-circle ios-add-circle mr-2"
      icon="ios-add-circle"
    />
    创建一条新的记账记录
  </button>
);

CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CreateBtn;
