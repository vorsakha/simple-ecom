import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import "./Product.css";

import Spinner from "../layout/Spinner";
import Footer from "../layout/Footer";

import { connect } from "react-redux";
import { getProductById } from "../../actions/product";
import { addToCart } from "../../actions/cart";

const Product = ({
  getProductById,
  product: { product },
  match,
  isAuthenticated,
  addToCart,
  cart: { loading },
}) => {
  const [redirect, setRedirect] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(match.params.id);
  }, [getProductById, match.params.id]);

  const handleBuy = (e) => {
    !isAuthenticated && setRedirect(true);

    e.preventDefault();

    const obj = { quantity: quantity };

    addToCart(match.params.id, obj);
  };

  if (redirect) return <Redirect to="/login" />;

  console.log();

  return (
    <Fade duration={300}>
      {product === null ? (
        <Spinner />
      ) : (
        <div className="product-wrapper">
          <div className="product-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <small>{product.brand}</small>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {product.countInStock > 0 ? (
              <form onSubmit={(e) => handleBuy(e)}>
                <input
                  className="quantity"
                  type="number"
                  name="quantity"
                  min="1"
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
    </Fade>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  isAuthenticated: state.auth.isAuthenticated,
  cart: state.cart,
});

export default connect(mapStateToProps, { getProductById, addToCart })(Product);
