import React from "react";
import { Link } from "react-router-dom";

import "./superDashboard.css";

const superDashboard = () => {
  return (
    <div className="super-dashboard">
      <div>
        <Link to="/create-product" className="btn btn-large">
          CREATE PRODUCT
        </Link>
      </div>
      <div className="info">
        <div className="first">
          <h1>CONTACT MESSAGES</h1>
        </div>
        <div>
          <h1>ACTIVE ORDERS</h1>
        </div>
      </div>
    </div>
  );
};

export default superDashboard;
