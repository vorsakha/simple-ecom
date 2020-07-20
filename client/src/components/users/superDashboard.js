import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import Spinner from "../layout/Spinner";
import ContactMessage from "../contact/ContactMessage";
import Footer from "../layout/Footer";
import SuperOrderDetails from "../order/SuperOrderDetails";

import { connect } from "react-redux";
import { getContacts } from "../../actions/contact";
import { deleteContact } from "../../actions/contact";
import { getAllOrders } from "../../actions/order";
import { getAllProducts } from "../../actions/product";
import { deleteProduct } from "../../actions/product";
import { setMessageOpen, setOrderOpen } from "../../actions/modal";

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
  setMessageOpen,
  modal: { messageOpen, orderOpen },
  setOrderOpen,
}) => {
  const [id, setId] = useState("");

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

  const handleMessage = (id) => {
    setId(id);

    setMessageOpen();
  };

  const handleOrder = (id) => {
    setId(id);

    setOrderOpen();
  };

  return (
    // <Fade duration={300}>
    <Fragment>
      <div className="dashboard">
        <div className="dash-btn">
          <Link to="/create-product" className="btn btn-large">
            Create a new product
          </Link>
        </div>
        <div className="super-container">
          <h3>Contact Messages</h3>
          <hr />
          <div className="content">
            {contacts === null && loading ? (
              <Spinner />
            ) : (
              <ul className="list">
                {contacts.length > 0 ? (
                  contacts.map((data, k) => (
                    <li key={k}>
                      <button
                        className="link"
                        onClick={() => handleMessage(data._id)}
                      >
                        {`${data.email} - (${data.message.length}) message(s)`}{" "}
                      </button>
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
        </div>
        <div className="super-container">
          <h3>All orders</h3>
          <hr />
          <div className="content">
            {contacts === null && loading ? (
              <Spinner />
            ) : (
              <ul className="list">
                {orders.length > 0 ? (
                  orders.map((data, k) => (
                    <li key={k}>
                      <button
                        type="button"
                        className="link"
                        onClick={() => handleOrder(data._id)}
                      >
                        {data._id}
                      </button>{" "}
                      - Total: ${data.items.totalPrice} -{" "}
                      {data.isDelivered ? (
                        <i className="fas fa-check color-success"></i>
                      ) : (
                        <i className="fas fa-truck color-danger"></i>
                      )}{" "}
                      {data.isPaid ? (
                        <i className="fas fa-money-bill color-success"></i>
                      ) : (
                        <i className="fas fa-money-bill color-danger"></i>
                      )}
                    </li>
                  ))
                ) : (
                  <p>No active orders at this moment.</p>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="super-container">
          <h3>Product List</h3>
          <hr />
          <div className="content">
            {products === null && loading ? (
              <Spinner />
            ) : (
              <ul className="list">
                {products.length > 0 ? (
                  products.map((data, k) => (
                    <li key={k}>
                      <Link
                        target="_blank"
                        className="link"
                        to={`/product/${data._id}`}
                      >
                        {data.name}
                      </Link>{" "}
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
      </div>
      <Footer />
      {messageOpen && <ContactMessage id={id} />}
      {orderOpen && <SuperOrderDetails id={id} />}
    </Fragment>
    //</Fade>
  );
};

SuperDashboard.propTypes = {
  getContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  setMessageOpen: PropTypes.func.isRequired,
  setOrderOpen: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
  order: state.order,
  product: state.product,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  getContacts,
  getAllOrders,
  getAllProducts,
  deleteProduct,
  deleteContact,
  setMessageOpen,
  setOrderOpen,
})(SuperDashboard);
