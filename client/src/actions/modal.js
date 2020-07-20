import {
  MODAL_HISTORY,
  MODAL_ADDRESS,
  GET_MODAL,
  CLEAR_MODAL,
  MODAL_ERROR,
  MODAL_MESSAGE,
  MODAL_ORDER,
  CLEAR_BUG,
  MODAL_EDIT,
} from "./types";

export const setIsOpen = () => (dispatch) => {
  try {
    dispatch({
      type: GET_MODAL,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setIsClosed = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_MODAL,
    });
    dispatch({
      type: CLEAR_BUG,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setHistoryOpen = (id) => (dispatch) => {
  try {
    dispatch({
      type: MODAL_HISTORY,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setAddressOpen = () => (dispatch) => {
  try {
    dispatch({
      type: MODAL_ADDRESS,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setMessageOpen = () => (dispatch) => {
  try {
    dispatch({
      type: MODAL_MESSAGE,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setOrderOpen = () => (dispatch) => {
  try {
    dispatch({
      type: MODAL_ORDER,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setEditOpen = () => (dispatch) => {
  try {
    dispatch({
      type: MODAL_EDIT,
    });
  } catch (err) {
    dispatch({
      type: MODAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
