import { combineReducers } from "redux";

import auth from "./auth";
import alert from "./alert";
import cart from "./cart";
import contact from "./contact";
import order from "./order";
import product from "./product";
import address from "./address";
import modal from "./modal";

export default combineReducers({
  auth,
  alert,
  cart,
  contact,
  order,
  product,
  address,
  modal,
});
