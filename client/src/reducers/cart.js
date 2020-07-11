import {
  GET_CART,
  CART_ERROR,
  CLEAR_CART,
  UPDATE_CART,
} from "../actions/types";

const initialState = {
  cart: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
    case UPDATE_CART:
      return {
        ...state,
        cart: payload,
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        cart: null,
        loading: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: null,
      };
    default:
      return state;
  }
}
