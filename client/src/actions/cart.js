import axios from "axios";
import { setAlert } from "./alert";

import { GET_CART, UPDATE_CART, CART_ERROR } from "./types";

// Get current user cart
export const getCurrentCart = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cart");

    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add to cart
export const addToCart = (id, quantity) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(`/api/cart/${id}`, quantity, config);

    dispatch({
      type: UPDATE_CART,
      payload: res.data,
    });

    dispatch(setAlert("Item added to cart.", "success"));
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(
      setAlert(err.response.status === 400 && "Item already in cart.", "danger")
    );
  }
};

// Remove item from cart
export const removeFromCart = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/cart/remove/${id}`);

    dispatch({
      type: UPDATE_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
