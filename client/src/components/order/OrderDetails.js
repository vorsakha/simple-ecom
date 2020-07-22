import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Zoom } from "react-awesome-reveal";
import { connect } from "react-redux";

import "./OrderDetails.css";

import { setIsClosed } from "../../actions/modal";

import Spinner from "../layout/Spinner";

const OrderDetails = ({
  setIsClosed,
  modal: { historyOpen, historyId },
  order: { orders },
}) => {
  const [obj, setObj] = useState(null);

  useEffect(() => {
    const o = orders.filter((data) => data._id === historyId)[0];

    setObj(o);
  }, [orders, historyId]);

  console.log(obj);
  return (
    <Modal
      className="modal"
      isOpen={historyOpen}
      onRequestClose={setIsClosed}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById("root")}
    >
      <Zoom duration={300}>
        <div className="cart">
          <div className="cart-head">
            <h3>Order Details</h3>
            <button type="button" onClick={() => setIsClosed()}>
              X
            </button>
          </div>
          {obj === null ? (
            <Spinner />
          ) : (
            <div className="cart-body">
              <div className="mb-1 double-list">
                <h3 style={{ width: "100%" }}>Items</h3>
                <hr />

                <ul className="list half">
                  {obj.items.name.map((data, k) => (
                    <li key={k}>{data}</li>
                  ))}
                </ul>
                <ul className="list half">
                  {obj.items.quantity.map((data, k) => (
                    <li key={k}>Quantity: {data}</li>
                  ))}
                </ul>
                <p>Total Price ${obj.items.totalPrice}</p>
              </div>
              <div className="mb-1">
                <h3>Payment method</h3>
                <hr />
                <p>{obj.payment.paymentMethod}</p>
                <p>{obj.date}</p>
              </div>
              <div className="mb-1">
                <h3>Address</h3>
                <hr />
                <p>Address: {obj.shipping.address}</p>
                <p>City: {obj.shipping.city}</p>
                <p>Country: {obj.shipping.country}</p>
                <p>Postal Code: {obj.shipping.postalCode}</p>
              </div>
            </div>
          )}
        </div>
      </Zoom>
    </Modal>
  );
};

OrderDetails.propTypes = {
  setIsClosed: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  order: state.order,
});

export default connect(mapStateToProps, { setIsClosed })(OrderDetails);
