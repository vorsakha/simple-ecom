import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import "./ProductsPage.css";

import { connect } from "react-redux";
import { getAllProducts } from "../../actions/product";

import Spinner from "../layout/Spinner";
import Footer from "../layout/Footer";

const ProductsPage = ({ getAllProducts, product: { products }, match }) => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    products.map(
      (data) =>
        data.category === match.params.id.toString() && setArr([...arr, data])
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  console.log(arr);

  if (match.params.id === null) return <Redirect to="/" />;

  return (
    <div className="products-page">
      <h2 style={{ width: "100%" }}>Category: {match.params.id}</h2>
      {products !== null ? (
        products.map(
          (data, k) =>
            data.category === match.params.id.toString() && (
              <Fade key={k} triggerOnce duration={300}>
                <div className="item">
                  <Link to={`/product/${data._id}`}>
                    <img
                      className="products-image"
                      src={data.image}
                      alt={data.name}
                    />
                  </Link>
                  <small>{data.brand}</small>
                  <Link className="item-link" to={`/product/${data._id}`}>
                    <h4>{data.name}</h4>
                  </Link>
                  <p>${data.price}</p>
                </div>
              </Fade>
            )
        )
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
};

ProductsPage.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getAllProducts })(ProductsPage);
