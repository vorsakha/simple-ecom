import {
  GET_ADDRESSES,
  GET_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  ADDRESS_ERROR,
} from "../actions/types";

const initialState = {
  addresses: [],
  address: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADDRESSES:
    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: payload,
        loading: false,
      };
    case GET_ADDRESS:
      return {
        ...state,
        address: payload,
        loading: false,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
        loading: false,
      };
    case ADDRESS_ERROR:
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
