import { GET_ID, CLEAR_ID, ID_ERROR } from "./types";

// Send id to state
export const sendId = (id) => (dispatch) => {
  try {
    dispatch({
      type: GET_ID,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearId = () => (dispatch) => {
  dispatch({ type: CLEAR_ID });
};
