import {
  GET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
  CONTACT_ERROR,
  CLEAR_CONTACT,
} from "../actions/types";

const initialState = {
  contacts: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
