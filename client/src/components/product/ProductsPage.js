import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import "./ProductsPage.css";

import { connect } from "react-redux";
import { getAllProducts } from "../../actions/product";
import { clearId } from "../../actions/id";

import Spinner from "../layout/Spinner";

const ProductsPage = ({
  getAllProducts,
  product: { products },
  id: { id, loading },
  //clearId,
}) => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    products.map(
      (data) => data.category === id.toString() && setArr([...arr, data])
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log(arr);

  if (id === null) return <Redirect to="/" />;

  return (
    <div className="product-page">
      <h2 style={{ width: "100%" }}>Category: {id}</h2>
      {products !== null ? (
        products.map(
          (data, k) =>
            data.category === id.toString() && (
              <Fade triggerOnce duration={300}>
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
              </Fade>
            )
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

ProductsPage.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
  clearId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  id: state.id,
});

export default connect(mapStateToProps, { getAllProducts, clearId })(
  ProductsPage
);
