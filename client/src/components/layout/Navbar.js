import React from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h1 className="logo">Ecommerce</h1>
      <ul>
        <li>
          <a href="#">shop</a>
        </li>
        <li>
          <a href="#">contact</a>
        </li>
        <li>
          <a href="#">cart</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
