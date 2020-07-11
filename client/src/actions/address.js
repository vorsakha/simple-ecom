import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_ADDRESSES,
  GET_ADDRESS,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  ADDRESS_ERROR,
} from "./types";

// Get all addresses for this user
export const getAddresses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/address");

    dispatch({
      type: GET_ADDRESSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get address by ID
export const getAddressById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/address/${id}`);

    dispatch({
      type: GET_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add address
export const createAddress = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/api/address", formData, config);

    dispatch({
      type: ADD_ADDRESS,
      payload: res.data,
    });

    dispatch(setAlert("Address saved.", "success"));
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};
