import {
  GET_ORDERS,
  GET_ORDER,
  ORDER_ERROR,
  UPDATE_ORDER,
  CLEAR_ORDER,
  ADD_ORDER,
  GET_ORDER_HISTORY,
} from "../actions/types";

const initialState = {
  order: null,
  orders: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case GET_ORDER_HISTORY:
    case GET_ORDERS:
    case UPDATE_ORDER:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: payload, // post
        loading: false,
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        order: null,
      };
    case CLEAR_ORDER:
      return {
        ...state,
        order: null,
      };
    default:
      return state;
  }
}
