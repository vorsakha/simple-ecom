import {
  MODAL_HISTORY,
  GET_MODAL,
  CLEAR_MODAL,
  MODAL_ERROR,
  MODAL_ADDRESS,
} from "../actions/types";

const initialState = {
  modalIsOpen: false,
  historyOpen: false,
  addressOpen: false,
  historyId: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MODAL:
      return {
        ...state,
        modalIsOpen: true,
      };
    case MODAL_ADDRESS:
      return {
        ...state,
        addressOpen: true,
      };
    case MODAL_HISTORY:
      return {
        ...state,
        historyOpen: true,
        historyId: payload,
      };
    case CLEAR_MODAL:
      return {
        ...state,
        modalIsOpen: false,
        historyOpen: false,
        addressOpen: false,
      };
    case MODAL_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
