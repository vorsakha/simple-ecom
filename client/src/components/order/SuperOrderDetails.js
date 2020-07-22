import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Zoom } from "react-awesome-reveal";
import { connect } from "react-redux";

import "./SuperOrderDetails.css";

import { setIsClosed } from "../../actions/modal";
import { getActiveOrderById, editOrderStatus } from "../../actions/order";

import Spinner from "../layout/Spinner";

const SuperOrderDetails = ({
  setIsClosed,
  modal: { orderOpen },
  order: { order },
  getActiveOrderById,
  id,
  editOrderStatus,
}) => {
  const [formData, setFormData] = useState({
    isPaid: "",
    paidAt: "",
    isDelivered: "",
    deliveredAt: "",
    status: "",
  });

  const { paidAt, deliveredAt } = formData;

  useEffect(() => {
    getActiveOrderById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editOrderStatus(formData, id);

    setIsClosed();

    window.location.reload();
  };

  return (
    <Modal
      className="modal"
      isOpen={orderOpen}
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
          {order === null || order === undefined ? (
            <Spinner />
          ) : (
            <div className="cart-body">
              <div className="mb-1 double-list">
                <h3 style={{ width: "100%" }}>Items</h3>
                <hr />

                <ul className="list half">
                  {order.items.name.map((data, k) => (
                    <li
                      style={{
                        width: "250px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      key={k}
                    >
                      {data}
                    </li>
                  ))}
                </ul>
                <ul className="list half">
                  {order.items.quantity.map((data, k) => (
                    <li key={k}>Quantity: {data}</li>
                  ))}
                </ul>
                <p>Total Price ${order.items.totalPrice}</p>
              </div>
              <div className="mb-1">
                <h3>Payment method</h3>
                <hr />
                <p>{order.payment.paymentMethod}</p>
                <p>{order.date}</p>
              </div>
              <div className="mb-1">
                <h3>Address</h3>
                <hr />
                <p>Address: {order.shipping.address}</p>
                <p>City: {order.shipping.city}</p>
                <p>Country: {order.shipping.country}</p>
                <p>Postal Code: {order.shipping.postalCode}</p>
              </div>
              <div className="mb-1">
                <h3>
                  <i className="fas fa-users-cog"></i> Adm
                </h3>
                <hr />
                <p>Is Paid: {order.isPaid.toString()}</p>
                <p>Paid At: {order.paidAt}</p>
                <p>Is Delivered: {order.isDelivered.toString()}</p>
                <p>Delivered At: {order.deliveredAt}</p>
                <p>Status: {order.status}</p>
              </div>
              <div className="form-container">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <p>Is it paid ?</p>
                    <input
                      style={{ width: "20px", cursor: "pointer" }}
                      type="radio"
                      name="isPaid"
                      id="paid"
                      value={true}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="paid">Yes</label>
                    <br />
                    <input
                      style={{ width: "20px", cursor: "pointer" }}
                      type="radio"
                      name="isPaid"
                      id="not-paid"
                      value={false}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="not-paid">No</label>
                    <br />
                  </div>
                  <div className="form-group">
                    <p>Paid At:</p>

                    <input
                      type="date"
                      placeholder="Paid At"
                      name="paidAt"
                      value={paidAt}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <p>Is it Delivered ?</p>
                    <input
                      style={{ width: "20px", cursor: "pointer" }}
                      type="radio"
                      name="isDelivered"
                      id="delivered"
                      value={true}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="delivered">Yes</label>
                    <br />
                    <input
                      style={{ width: "20px", cursor: "pointer" }}
                      type="radio"
                      name="isDelivered"
                      id="not-delivered"
                      value={false}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="not-delivered">No</label>
                    <br />
                  </div>
                  <div className="form-group">
                    <p>Delivered at:</p>

                    <input
                      type="date"
                      name="deliveredAt"
                      value={deliveredAt}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <p>Status: </p>
                    <input
                      style={{ width: "20px", cursor: "pointer" }}
                      id="active"
                      type="radio"
                      placeholder="Country"
                      name="status"
                      value={true}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="active">Active</label>
                    <br />
                    <input
                      style={{ width: "20px", cursor: "pointer" }}
                      type="radio"
                      name="status"
                      id="inactive"
                      value={false}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="inactive">Inactive</label>
                    <br />
                  </div>
                  <input type="submit" className="btn" value="Save" />
                </form>
              </div>
            </div>
          )}
        </div>
      </Zoom>
    </Modal>
  );
};

SuperOrderDetails.propTypes = {
  setIsClosed: PropTypes.func.isRequired,
  getActiveOrderById: PropTypes.func.isRequired,
  editOrderStatus: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  order: state.order,
});

export default connect(mapStateToProps, {
  setIsClosed,
  getActiveOrderById,
  editOrderStatus,
})(SuperOrderDetails);
