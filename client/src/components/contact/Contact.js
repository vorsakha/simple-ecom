import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

import "./Contact.css";

const Contact = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (isAuthenticated) return <Redirect to={"/dashboard"} />;

  return (
    <div className="form-container">
      <h1 className="title">Contact</h1>
      <p className="lead">
        <i className="fas fa-envelope"></i> Create a contact message
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="message"
            placeholder="Create a message with 300 or less characters."
            name="message"
            minLength="6"
            maxLength="300"
            value={message}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn" value="Register" />
      </form>
    </div>
  );
};

Contact.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setAlert,
})(Contact);
