import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import Spinner from "../layout/Spinner";

const Login = ({ login, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="form-container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {" "}
          <h1 className="title">Sign In</h1>
          <p>
            <i className="fas fa-user"></i> Sign Into Your Account
          </p>
          <form
            className="form"
            action="create-profile.html"
            onSubmit={(e) => handleSubmit(e)}
          >
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
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <input type="submit" className="btn" value="Login" />
          </form>
          <p>
            Don't have an account?{" "}
            <Link className="btn-blue" to="/register">
              Sign Up
            </Link>
          </p>
        </Fragment>
      )}
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
