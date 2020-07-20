import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import "./Dashboard.css";

import Footer from "../layout/Footer";
import Spinner from "../layout/Spinner";
import OrderDetails from "../order/OrderDetails";
import Address from "../users/Address";

import { connect } from "react-redux";
import { getHistory } from "../../actions/order";
import { setHistoryOpen, setAddressOpen } from "../../actions/modal";
import { getAddresses, removeAddress } from "../../actions/address";

const Dashboard = ({
  getHistory,
  order: { orders },
  modal: { historyOpen, addressOpen },
  setHistoryOpen,
  setAddressOpen,
  getAddresses,
  removeAddress,
  address: { addresses },
}) => {
  useEffect(() => {
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  return (
    <Fragment>
      <div className="dashboard">
        <h1>My Account</h1>
        <div className="first dash-container">
          <h3 className="dash-title">
            <i className="fas fa-shopping-bag"></i> Order History
          </h3>
          <hr />
          <div className="content">
            <ul className="list">
              {orders === null ? (
                <Spinner />
              ) : orders.length === 0 ? (
                <p>No order</p>
              ) : (
                orders.map((data, k) => (
                  <li key={k} style={{ textAlign: "start" }}>
                    <button
                      className="link"
                      href=""
                      onClick={() => setHistoryOpen(data._id)}
                    >
                      See details
                    </button>{" "}
                    ${data.items.totalPrice}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="dash-container">
          <h3 className="dash-title">
            <i className="fas fa-address-card"></i> My Addresses
          </h3>
          <hr />
          <div className="content">
            <ul className="list">
              {addresses === null ? (
                <Spinner />
              ) : addresses.length === 0 ? (
                <p>No address saved.</p>
              ) : (
                addresses.map((data, k) => (
                  <li
                    className="address-li"
                    key={k}
                    style={{ textAlign: "start" }}
                  >
                    <p className="limit-char">{data.address}</p>
                    <button
                      className="btn-icon"
                      onClick={() => removeAddress(data._id)}
                      type="button"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="dash-btn">
            {" "}
            <button
              className="btn address-btn"
              type="button"
              onClick={() => setAddressOpen()}
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {historyOpen && <OrderDetails />}
      {addressOpen && <Address />}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getHistory: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  historyOpen: PropTypes.bool,
  addressOpen: PropTypes.bool,
  setHistoryOpen: PropTypes.func.isRequired,
  setAddressOpen: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  getAddresses: PropTypes.func.isRequired,
  removeAddress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
  modal: state.modal,
  address: state.address,
});

export default connect(mapStateToProps, {
  getHistory,
  setHistoryOpen,
  getAddresses,
  removeAddress,
  setAddressOpen,
})(Dashboard);
