import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import { getContacts } from "../../actions/contact";
import { getAllOrders } from "../../actions/order";

import "./superDashboard.css";

const SuperDashboard = ({
  getAllOrders,
  order: { orders },
  getContacts,
  contact: { contacts, loading },
}) => {
  useEffect(() => {
    getContacts();
    getAllOrders();
  }, []);

  console.log(orders);

  return (
    <div className="super-dashboard">
      <div>
        <Link to="/create-product" className="btn btn-large">
          Create a new product
        </Link>
      </div>
      <div className="info">
        <div className="first">
          <h1>Contact Messages</h1>
          {contacts === undefined ? (
            <Spinner />
          ) : (
            <ul>
              {contacts.length > 0 ? (
                contacts.map((data) => <li>{data.subject}</li>)
              ) : (
                <h3>No contact message at this moment.</h3>
              )}
            </ul>
          )}
        </div>
        <div>
          <h1>Active orders</h1>
          {contacts === undefined ? (
            <Spinner />
          ) : (
            <ul>
              {contacts.length > 0 ? (
                contacts.map((data) => <li>{data.subject}</li>)
              ) : (
                <h3>No contact message at this moment.</h3>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

SuperDashboard.propTypes = {
  getContacts: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
  order: state.order,
});

export default connect(mapStateToProps, { getContacts })(SuperDashboard);
