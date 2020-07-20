import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";
import Modal from "react-modal";

import "./EditProduct.css";

import { editProduct } from "../../actions/product";
import { setIsClosed } from "../../actions/modal";

const CreateProduct = ({
  id,
  product: { product },
  setIsClosed,
  editProduct,
  modal: { editProductOpen },
}) => {
  const [formData, setFormData] = useState({
    name: product.name,
    image: product.image,
    brand: product.brand,
    price: product.price,
    category: product.category,
    countInStock: product.countInStock,
    description: product.description,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    editProduct(formData, id);

    setIsClosed();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      className="edit-modal"
      isOpen={editProductOpen}
      onRequestClose={setIsClosed}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById("root")}
    >
      <Fade duration={300}>
        <div className="edit-product">
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
              <input type="submit" className="btn btn-primary" value="Save" />
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

CreateProduct.propTypes = {
  setIsClosed: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  modal: state.modal,
});

export default connect(mapStateToProps, { editProduct, setIsClosed })(
  CreateProduct
);
