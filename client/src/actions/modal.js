import {
  MODAL_HISTORY,
  MODAL_ADDRESS,
  GET_MODAL,
  CLEAR_MODAL,
  MODAL_ERROR,
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
