import React, { Fragment } from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <Fragment>
      <nav>
        <div className="mini-nav">
          <ul className="menu-ul">
            <li>
              <a className="log" href="#">
                LOG IN
              </a>
            </li>
            <li>
              <a className="log" href="#">
                CREATE ACCOUNT
              </a>
            </li>
          </ul>
        </div>
        <div className="nav">
          <h1 className="logo">e-com</h1>
          <ul className="menu-ul">
            <li>
              <a className="menu-a" href="#">
                SHOP
              </a>
            </li>
            <li>
              <a className="menu-a" href="#">
                CONTACT
              </a>
            </li>
            <li>
              <a className="menu-a" href="#">
                CART
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
