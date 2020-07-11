import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_CONTACT,
  GET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
  CONTACT_ERROR,
} from "./types";

// Get all contact messages (super)
export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contact");

    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get message by id (super)
export const getContactById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/contact/${id}`);

    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create contact message
export const createContact = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/contact", formData, config);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });

    dispatch(setAlert("Contact send.", "success"));
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.status, status: err.response.status },
    });
  }
};

// Delete contact message by ID (super)
export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contact/${id}`);

    dispatch({
      type: REMOVE_CONTACT,
      payload: id,
    });

    dispatch(setAlert("Contact deleted", "success"));
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
