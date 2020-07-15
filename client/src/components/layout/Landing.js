import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import "./Landing.css";

import Spinner from "../layout/Spinner";
import Footer from "./Footer";

import { connect } from "react-redux";
import { getAllProducts } from "../../actions/product";
import { clearContact } from "../../actions/contact";

const Landing = ({
  getAllProducts,
  product: { products, loading },
  clearContact,
}) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    clearContact();
  }, [clearContact]);

  console.log(products);

  return (
    <Fragment>
      <Fade duration={300}>
        <section className="landing-image">
          <div className="big-image">
            <div className="big-image-overlay">
              <h2 className="image-title">New Suits Out Now!</h2>
              <h3>
                <Link className="image-a btn" to="/products/Suit">
                  Shop Now
                </Link>
              </h3>
            </div>
          </div>
        </section>
        <section className="landing-items">
          <h2 style={{ width: "100%" }}>Featured Items</h2>
          {products !== null && !loading ? (
            products.slice(0, 6).map((data, k) => (
              <Fade key={k} triggerOnce duration={300}>
                <div className="item">
                  <Link to={`/product/${data._id}`}>
                    <img src={data.image} alt={data.name} />
                  </Link>
                  <small>{data.brand}</small>
                  <Link className="item-link" to={`/product/${data._id}`}>
                    <h4>{data.name}</h4>
                  </Link>
                  <p>${data.price}</p>
                </div>
              </Fade>
            ))
          ) : (
            <Spinner />
          )}
        </section>
        <Footer />
      </Fade>
    </Fragment>
  );
};

Landing.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  clearContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, {
  getAllProducts,
  clearContact,
})(Landing);
