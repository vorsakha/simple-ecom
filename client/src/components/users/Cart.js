import React, { useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Zoom } from "react-awesome-reveal";

import "./Cart.css";

import { setIsClosed } from "../../actions/modal";
import { getCurrentCart, removeFromCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";

const Cart = ({
  setIsClosed,
  modal: { modalIsOpen },
  getCurrentCart,
  removeFromCart,
  cart: { cart },
  isAuthenticated,
}) => {
  useEffect(() => {
    getCurrentCart();
  }, [getCurrentCart]);

  if (!isAuthenticated) {
    setIsClosed();
    return <Redirect to={"/login"} />;
  }

  const handleOrder = () => {
    setIsClosed();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={setIsClosed}
      className="modal"
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={true}
      //ariaHideApp={false}
    >
      <Zoom duration={300}>
        <div className="cart">
          <div className="cart-head">
            <h3>Your Cart</h3>
            <button type="button" onClick={() => setIsClosed()}>
              X
            </button>
          </div>
          <div className="cart-body">
            {cart === null ? (
              <Spinner />
            ) : (
              <Fragment>
                {cart.orders.length === 0 && <p>No items in cart</p>}
                {cart.orders.map((data, k) => (
                  <Fragment key={k}>
                    <div className="cart-card">
                      <div className="in-card">
                        <img src={data.image} alt={data.name} />
                        <h4>{data.name}</h4>
                      </div>
                      <div className="in-card">
                        <h4>Price: {data.price}</h4>
                        <h4>Quantity: {data.quantity}</h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(data._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </Fragment>
            )}
            <h3>
              {cart !== null && (
                <Fragment>
                  {cart.orders.length > 0 && <span>Total: $</span>}
                  {cart.orders.length > 0 &&
                    cart.orders
                      .map(
                        (data) => (data.price / data.quantity) * data.quantity
                      )
                      .reduce((total, num) => total + num)
                      .toFixed(2)}
                </Fragment>
              )}
            </h3>
            {cart !== null && cart.orders.length > 0 && (
              <Link
                to={`/order/${cart._id}`}
                className="btn"
                style={{ width: "300px", padding: "15px" }}
                type="button"
                onClick={() => handleOrder()}
              >
                Check Out
              </Link>
            )}
          </div>
        </div>
      </Zoom>
    </Modal>
  );
};

Cart.propTypes = {
  setIsClosed: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  getCurrentCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setIsClosed,
  getCurrentCart,
  removeFromCart,
})(Cart);
