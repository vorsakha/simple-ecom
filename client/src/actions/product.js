import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
} from "./types";

// Create product (super)
export const createProduct = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/upload", formData, config);

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Product created.", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Edit product (super)
export const editProduct = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/upload/${id}`, formData, config);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Product successfully edited.", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Delete product by ID (super)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/products/${id}`);

    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });

    dispatch(setAlert("Product removed.", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/all");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get product by ID
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rate a product
export const rateProduct = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/products/rate/${id}`, formData, config);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Rating added.", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a rating
export const deleteRating = (productId, rateId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/rate/${productId}/${rateId}`);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Rating removed.", "success"));
  } catch (err) {
    dispatch({
      PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
