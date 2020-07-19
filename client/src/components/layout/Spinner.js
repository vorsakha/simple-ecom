import React, { Fragment } from "react";

import spinner from "../../images/spinner.gif";

export default function () {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "50px", margin: "10px auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
}
