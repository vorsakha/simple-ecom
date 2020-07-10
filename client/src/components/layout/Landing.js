import React, { Fragment } from "react";

import "./Landing.css";

const Landing = () => {
  return (
    <Fragment>
      <section className="landing-image">
        <div className="big-image">
          <div className="big-image-overlay">
            <h2 className="image-title">New Suits</h2>
            <h3>
              <a className="image-a" href="#">
                Shop Now
              </a>
            </h3>
          </div>
        </div>
      </section>
      <section className="landing-items">
        <h2>Featured Items</h2>
      </section>
    </Fragment>
  );
};

export default Landing;
