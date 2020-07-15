import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fade } from "react-awesome-reveal";

import "./Alert.css";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Fade key={alert.id} duration={300} className={`alert ${alert.alertType}`}>
      <div>{alert.msg}</div>
    </Fade>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
