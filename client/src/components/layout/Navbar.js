import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { setIsOpen } from "../../actions/modal";

import "./Navbar.css";

const Navbar = ({
  auth: { isAuthenticated, loading, user, isAdmin },
  logout,
  product: { products },
  setIsOpen,
}) => {
  const [categories, setCategory] = useState(null);
  const [toggleMenu, setToggle] = useState(false);
  const [toggleShop, setToggleShop] = useState(false);

  useEffect(() => {
    const unique = [...new Set(products.map((data) => data.category))];

    products.length > 0 && setCategory(unique);
  }, [products]);

  const authMiniLinks = (
    <ul className="mini">
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
    <ul className="mini">
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

  const menu = (
    <Fragment>
      <ul className="menu-mobile">
        <li>
          <button
            className="mobile-btn"
            type="button"
            onClick={() => {
              setToggle(!toggleMenu);
              setToggleShop(false);
            }}
          >
            <i className="fas fa-bars"></i>
          </button>
        </li>
      </ul>
      {toggleMenu && (
        <Fade cascade duration={500}>
          <ul className="mobile-content">
            <li>
              <button
                className="dropdown-btn"
                type="button"
                onClick={() => setToggleShop(!toggleShop)}
              >
                <i className="fas fa-caret-left"></i> SHOP
              </button>
              {toggleShop && (
                <Fade cascade duration={500}>
                  <ul className="shop-dropdown">
                    {categories !== null &&
                      categories.map((data, k) => (
                        <li key={k}>
                          <Link
                            className="menu-a"
                            to={`/products/${data}`}
                            onClick={() => {
                              setToggle(!toggleMenu);
                              setToggleShop(false);
                            }}
                          >
                            {data}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </Fade>
              )}
            </li>
            <li>
              <Link
                className="cart-btn"
                to="/contact"
                onClick={() => {
                  setToggle(!toggleMenu);
                  setToggleShop(false);
                }}
              >
                CONTACT
              </Link>
            </li>
            <li>
              <button
                className="cart-btn"
                onClick={() => {
                  setIsOpen();

                  setToggle(!toggleMenu);
                  setToggleShop(false);
                }}
              >
                CART
              </button>
            </li>
          </ul>
        </Fade>
      )}
    </Fragment>
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
              <button className="cart-btn" onClick={() => setIsOpen()}>
                CART
              </button>
            </li>
          </ul>
          {menu}
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, {
  logout,
  setIsOpen,
})(Navbar);
