import React, { Fragment } from "react";

import spinner from "../../images/suit-869380_1920 (1).jpg";

export default function () {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
}
