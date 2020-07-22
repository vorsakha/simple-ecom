import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./Product.css";

import Spinner from "../layout/Spinner";
import Footer from "../layout/Footer";
import EditProduct from "./EditProduct";

import { connect } from "react-redux";
import { getProductById } from "../../actions/product";
import { addToCart } from "../../actions/cart";
import { setEditOpen } from "../../actions/modal";

const Product = ({
  auth: { isAdmin },
  getProductById,
  product: { product },
  match,
  isAuthenticated,
  addToCart,
  setEditOpen,
  modal: { editProductOpen },
}) => {
  const [redirect, setRedirect] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRate] = useState(0);

  useEffect(() => {
    getProductById(match.params.id);
  }, [getProductById, match.params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (product !== null) {
      if (product.reviews.length > 1) {
        product.reviews.map((data) =>
          setRate(((rating + data.rating) / 2).toFixed(0))
        );
      } else {
        product.reviews.map((data) => setRate(data.rating));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleBuy = (e) => {
    !isAuthenticated && setRedirect(true);

    e.preventDefault();

    const obj = { quantity: quantity };

    addToCart(match.params.id, obj);
  };

  const rate = (
    <div style={{ margin: "20px" }}>
      {product !== null && (
        <span>
          <i
            className={` ${
              rating >= 1 ? "fas fa-star star-red" : "fas fa-star star-blue"
            }`}
          ></i>
          <i
            className={`fas fa-star ${rating >= 2 ? "star-red" : "star-blue"}`}
          ></i>
          <i
            className={`fas fa-star ${rating >= 3 ? "star-red" : "star-blue"}`}
          ></i>
          <i
            className={`fas fa-star ${rating >= 4 ? "star-red" : "star-blue"}`}
          ></i>
          <i
            className={`fas fa-star ${rating >= 5 ? "star-red" : "star-blue"}`}
          ></i>
        </span>
      )}
    </div>
  );

  if (redirect) return <Redirect to="/login" />;

  return (
    <Fragment>
      {/* <Fade duration={300}> */}
      {product === null ? (
        <Spinner />
      ) : (
        <div className="product-wrapper">
          <div className="product-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            {isAdmin && (
              <Fragment>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setEditOpen()}
                >
                  <i className="fas fa-edit color-success"></i>
                </button>
                <br />
              </Fragment>
            )}
            <small>{product.brand}</small>
            <h2>{product.name}</h2>
            {rating > 0 && rate}
            <p>{product.description}</p>
            {product.countInStock > 0 ? (
              <form onSubmit={(e) => handleBuy(e)}>
                <input
                  className="quantity"
                  type="number"
                  name="quantity"
                  min="1"
                  max={product.countInStock}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></input>
                <button className="buy-btn" type="submit">
                  Add to Cart <i className="dot fas fa-circle"></i>
                  {"  "} ${(product.price * quantity).toFixed(2)}
                </button>
              </form>
            ) : (
              <button className="buy-btn" type="button" disabled>
                Sold Out
              </button>
            )}
          </div>
        </div>
      )}
      <Footer />
      {editProductOpen && <EditProduct id={match.params.id} />}
      {/* </Fade> */}
    </Fragment>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  setEditOpen: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  getProductById,
  addToCart,
  setEditOpen,
})(Product);
