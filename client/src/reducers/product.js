import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [payload, ...state.products], // fine
        loading: false,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((prod) => prod._id !== payload),
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        product: null,
      };
    default:
      return state;
  }
}
