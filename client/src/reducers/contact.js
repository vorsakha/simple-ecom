import {
  GET_CONTACT,
  GET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
  CONTACT_ERROR,
} from "../actions/types";

const initialState = {
  contacts: [],
  contact: null,
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
    case GET_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
        loading: false,
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((cont) => cont._id !== payload),
        loading: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return {
        state,
      };
  }
}
