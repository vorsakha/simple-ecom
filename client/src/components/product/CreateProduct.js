import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProduct } from "../../actions/product";

import "./CreateProduct.css";

const CreateProduct = ({ createProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
  });

  const {
    name,
    image,
    brand,
    price,
    category,
    countInStock,
    description,
  } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct(formData);

    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h1 className="title">Create a product</h1>
      <form className="form mb-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            required
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Image Url"
            name="image"
            value={image}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Brand Name"
            name="brand"
            required
            value={brand}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Price"
            name="price"
            required
            value={price}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            name="category"
            required
            value={category}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Count in Stock"
            name="countInStock"
            required
            value={countInStock}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            name="description"
            required
            value={description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

export default connect(null, { createProduct })(CreateProduct);
