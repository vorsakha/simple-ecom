import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import "./Navbar.css";

const Navbar = ({
  auth: { isAuthenticated, loading, user, isAdmin },
  logout,
  product: { products },
}) => {
  const [categories, setCategory] = useState(null);

  useEffect(() => {
    const unique = [...new Set(products.map((data) => data.category))];

    products.length > 0 && setCategory(unique);
  }, [products]);

  const authMiniLinks = (
    <ul className="menu-ul">
      <li>
        <Link to={isAdmin ? "/super-dashboard" : "/dashboard"} className="log">
          <i className={isAdmin ? "fas fa-users-cog" : "fas fa-user"}></i>{" "}
          {user && user.name}
        </Link>
      </li>
      <li className="dot-li">
        <i className="dot fas fa-circle"></i>
      </li>
      <li>
        <a onClick={logout} className="log" href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestMiniLinks = (
    <ul className="menu-ul">
      <li>
        <Link className="log" to="/login">
          LOG IN
        </Link>
      </li>
      <li className="dot-li">
        <i className="dot fas fa-circle"></i>
      </li>
      <li>
        <Link className="log" to="/register">
          CREATE ACCOUNT
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav>
        <div className="mini-nav">
          {!loading && (
            <Fragment>
              {isAuthenticated ? authMiniLinks : guestMiniLinks}
            </Fragment>
          )}
        </div>
        <div className="nav">
          <Link className="title-a" to="/">
            <h1 className="logo">
              e<i className="logo-dot fas fa-circle"></i>
              com
            </h1>
          </Link>
          <ul className="menu-ul">
            <li>
              <button className="dropdown-btn" type="button">
                SHOP ⇂
              </button>
              <Fade duration={300}>
                <ul className="dropdown-content">
                  {categories !== null &&
                    categories.map((data, k) => (
                      <li key={k}>
                        <Link className="menu-a" to={`/products/${data}`}>
                          {data}
                        </Link>
                      </li>
                    ))}
                </ul>
              </Fade>
            </li>
            <li>
              <Link className="menu-a" to="/contact">
                CONTACT
              </Link>
            </li>
            <li>
              <Link className="menu-a" to="/cart">
                CART
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, {
  logout,
})(Navbar);
