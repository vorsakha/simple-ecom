import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import "./Order.css";

import { orderItems } from "../../actions/order";
import { getCurrentCart } from "../../actions/cart";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAddresses, getAddressById } from "../../actions/address";

const Order = ({
  match,
  orderItems,
  cart: { cart },
  getCurrentCart,
  getAddresses,
  getAddressById,
  address: { addresses, selectedAddress },
}) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
  });
  const { address, city, postalCode, country, paymentMethod } = formData;

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  useEffect(() => {
    selectedAddress !== null &&
      setFormData({
        address: selectedAddress.address,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.postalCode,
      });
  }, [selectedAddress]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await orderItems(formData);

    getCurrentCart();
  };

  const handleSelect = async (e) => {
    await getAddressById(e.target.value);
  };

  if (cart === null || cart.orders.length === 0) return <Redirect to="/" />;

  console.log(formData);

  return (
    <Fade duration={300}>
      <div className="form-container">
        <h1 className="title">Check Out</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <p style={{ textAlign: "center" }}>
            <i className="fas fa-address-card"></i> Add information
          </p>
          <div className="form-group">
            <select
              id="cars"
              defaultValue="select"
              onChange={(e) => handleSelect(e)}
            >
              <option disabled value="select">
                Select Saved Address
              </option>
              {addresses !== null &&
                addresses.map((data, k) => (
                  <option key={k} value={data._id}>
                    {data.address}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={country}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={city}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              required
              value={address}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Postal Code (only numbers)"
              name="postalCode"
              value={postalCode}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "25px" }}>
            <i className="fas fa-credit-card"></i> Add payment information
          </p>
          <div className="form-group">
            <input
              type="text"
              placeholder="Payment method"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input type="submit" className="btn" value="Order" />
        </form>
      </div>
    </Fade>
  );
};

Order.propTypes = {
  orderItems: PropTypes.func.isRequired,
  getCurrentCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  getAddresses: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  getAddressById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  address: state.address,
});

export default connect(mapStateToProps, {
  orderItems,
  getCurrentCart,
  getAddresses,
  getAddressById,
})(Order);
