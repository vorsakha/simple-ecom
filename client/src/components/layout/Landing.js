import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./Landing.css";

import Spinner from "../layout/Spinner";

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

  return (
    <Fragment>
      <section className="landing-image">
        <div className="big-image">
          <div className="big-image-overlay">
            <h2 className="image-title">New Suits</h2>
            <h3>
              <a className="image-a btn" href="!#">
                Shop Now
              </a>
            </h3>
          </div>
        </div>
      </section>
      <section className="landing-items">
        <h2 style={{ width: "100%" }}>Featured Items</h2>
        {products !== null && !loading ? (
          products.slice(0, 6).map((data, k) => (
            <div className="item" key={k}>
              <Link to="/">
                <img src={data.image} alt={data.name} />
              </Link>
              <small>{data.brand}</small>
              <Link className="item-link" to="/">
                <h4>{data.name}</h4>
              </Link>
              <p>${data.price}</p>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </section>
      <section className="footer">
        <div className="f-item">
          <h3>FAQ</h3>
          <hr />
        </div>
        <div className="f-item">
          <h3>About</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            maximus magna placerat sapien ultrices, non semper est aliquet.
            Aenean nulla nisl, aliquam et nisl ac, venenatis pellentesque dui.
          </p>
          <p>
            Vestibulum rhoncus, lectus sed vulputate dignissim, justo justo
            tempor tortor, at rhoncus sapien orci in libero. Quisque condimentum
            tellus sed nisi faucibus consectetur non sed ex. Suspendisse
            fermentum turpis neque, non laoreet sapien sagittis nec. Vivamus
            vitae massa vestibulum, mattis eros ac, pulvinar eros. Donec vitae
            ipsum congue, imperdiet nisl non, varius lectus. Aenean placerat
            laoreet congue. Suspendisse pretium, ipsum tristique dignissim
            luctus, tortor mi convallis enim, non vehicula diam ante et lorem.
          </p>
          <p>
            Integer blandit nisi eu risus volutpat, quis elementum urna
            fermentum. Duis eget fermentum ipsum.
          </p>
        </div>
        <div className="f-item">
          <h3>Newsletter</h3>
          <hr />
          <p>Join our mailing list</p>
          <form className="form-group newsletter">
            <input type="email" placeholder="your@email.com"></input>
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
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

export default connect(mapStateToProps, { getAllProducts, clearContact })(
  Landing
);
