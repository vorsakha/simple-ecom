import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

import "./Contact.css";

import { createContact } from "../../actions/contact";

const Contact = ({ createContact, contact: { loading } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
    subject: "",
  });

  const { name, email, text, subject } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    createContact(formData);
  };

  if (!loading) return <Redirect to="/" />;

  return (
    <div className="form-container">
      <h1 className="title">Contact</h1>
      <p className="lead">
        <i className="fas fa-envelope"></i> Create a contact message
      </p>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
            type="text"
            placeholder="Subject"
            name="subject"
            required
            value={subject}
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
            name="text"
            minLength="6"
            maxLength="300"
            value={text}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn" />
      </form>
    </div>
  );
};

Contact.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});

export default connect(mapStateToProps, {
  setAlert,
  createContact,
})(Contact);
