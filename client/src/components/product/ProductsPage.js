import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

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

  //   useEffect(() => {
  //     clearId();
  //   }, [clearId]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    products.map(
      (data) => data.category === id.toString() && setArr([...arr, data])
    );
  }, [id]);

  console.log(arr);

  if (id === null) return <Redirect to="/" />;

  return (
    <div className="product-page">
      {products !== null ? (
        products.map(
          (data) => data.category === id.toString() && <h3>{data.name}</h3>
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
