import {
  GET_ADDRESSES,
  GET_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  ADDRESS_ERROR,
  CLEAR_ADDRESS,
} from "../actions/types";

const initialState = {
  addresses: null,
  selectedAddress: null,
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
        selectedAddress: payload,
        loading: false,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: payload,
        loading: false,
      };
    case ADDRESS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ADDRESS:
      return {
        ...state,
        addresses: null,
        selectedAddress: null,
        loading: true,
      };
    default:
      return state;
  }
}
