import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import { getContacts } from "../../actions/contact";
import { deleteContact } from "../../actions/contact";
import { getAllOrders } from "../../actions/order";
import { getAllProducts } from "../../actions/product";
import { deleteProduct } from "../../actions/product";

import "./superDashboard.css";

const SuperDashboard = ({
  getAllOrders,
  order: { orders },
  getContacts,
  deleteContact,
  contact: { contacts, loading },
  getAllProducts,
  deleteProduct,
  product: { products },
}) => {
  useEffect(() => {
    getContacts();
  }, [getContacts]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleDeleteMessage = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteContact(id);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(id);
    }
  };

  console.log(orders);

  return (
    <div className="dashboard">
      <Fade duration={300}>
        <div>
          <Link to="/create-product" className="btn btn-large">
            Create a new product
          </Link>
        </div>
        <div className="info">
          <div className="first">
            <h3>Contact Messages</h3>
            {contacts === null && loading ? (
              <Spinner />
            ) : (
              <ul className="list">
                {contacts.length > 0 ? (
                  contacts.map((data, k) => (
                    <li key={k}>
                      {`${data.email} - (${data.message.length}) message(s)`}{" "}
                      <button
                        className="btn-icon"
                        onClick={() => handleDeleteMessage(data._id)}
                        type="button"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No contact message at this moment.</p>
                )}
              </ul>
            )}
          </div>
          <div className="second">
            <h3>Active orders</h3>
            {contacts === null && loading ? (
              <Spinner />
            ) : (
              <ul className="list">
                {orders.length > 0 ? (
                  orders.map((data, k) => (
                    <li key={k}>
                      {data._id} - Total: ${data.items.totalPrice}
                    </li>
                  ))
                ) : (
                  <p>No active orders at this moment.</p>
                )}
              </ul>
            )}
          </div>
          <div>
            <h3>Product List</h3>
            {products === null && loading ? (
              <Spinner />
            ) : (
              <ul className="list">
                {products.length > 0 ? (
                  products.map((data, k) => (
                    <li key={k}>
                      {data.name}{" "}
                      <button
                        className="btn-icon"
                        onClick={() => handleDeleteProduct(data._id)}
                        type="button"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No active orders at this moment.</p>
                )}
              </ul>
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
};

SuperDashboard.propTypes = {
  getContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
  order: state.order,
  product: state.product,
});

export default connect(mapStateToProps, {
  getContacts,
  getAllOrders,
  getAllProducts,
  deleteProduct,
  deleteContact,
})(SuperDashboard);
