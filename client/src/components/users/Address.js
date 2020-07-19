import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Zoom } from "react-awesome-reveal";

import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import { setIsClosed } from "../../actions/modal";
import { createAddress } from "../../actions/address";

const Address = ({
  modal: { addressOpen },
  setIsClosed,
  createAddress,
  address: { loading },
}) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const { address, city, postalCode, country } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(formData);

    await createAddress(formData);

    setIsClosed();
  };

  return (
    <Modal
      className="modal"
      isOpen={addressOpen}
      onRequestClose={setIsClosed}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById("root")}
    >
      <Zoom duration={300}>
        {loading ? (
          <Spinner />
        ) : (
          <div className="cart" style={{ marginTop: "110px" }}>
            <div className="cart-head">
              <h3>
                <i className="fas fa-address-card"></i> Create an address
              </h3>
              <button type="button" onClick={() => setIsClosed()}>
                X
              </button>
            </div>
            <div className="form-container">
              <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
                    type="text"
                    placeholder="City"
                    name="city"
                    required
                    value={city}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Postal Code (numbers only)"
                    name="postalCode"
                    value={postalCode}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={country}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <input type="submit" className="btn" value="Save" />
              </form>
            </div>
          </div>
        )}
      </Zoom>
    </Modal>
  );
};

Address.propTypes = {
  modal: PropTypes.object.isRequired,
  setIsClosed: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  createAddress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  address: state.address,
});

export default connect(mapStateToProps, { setIsClosed, createAddress })(
  Address
);
