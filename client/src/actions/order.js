import axios from "axios"
import { setAlert } from "./alert"

import {
  GET_ORDER_HISTORY,
  GET_ORDERS,
  GET_ORDER,
  ORDER_ERROR,
  UPDATE_ORDER,
  ADD_ORDER,
} from "./types";

// Get current user order history
export const getHistory = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/history");

    dispatch({
      type: GET_ORDER_HISTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit order status (super)
export const editOrderStatus = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/history/${id}`, formData, config);

    dispatch({
      type: UPDATE_ORDER,
      payload: res.data,
    });

    dispatch(setAlert("Order status updated", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      error.forEach((error) => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Get current user order by id 
export const getOrderById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/history/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Order cart items
export const orderItems = (formData) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await axios.post(`/api/order`, formData, config)

        dispatch({
            type: ADD_ORDER,
            payload: res.data
        })


    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

// Get all active orders (super)
export const getAllOrders = () => async dispatch => {
    try {
        const res = await axios.get(`/api/order`)

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get specific active order (super)
export const getActiveOrderById = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/order/${id}`);
  
      dispatch({
        type: GET_ORDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };