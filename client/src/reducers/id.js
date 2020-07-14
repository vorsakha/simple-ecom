import { GET_ID, CLEAR_ID, ID_ERROR } from "../actions/types";

const initialState = {
  id: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ID:
      return {
        ...state,
        id: payload,
        loading: false,
      };
    case CLEAR_ID:
      return {
        ...state,
        id: null,
        loading: true,
      };
    case ID_ERROR:
      return {
        ...state,
        error: payload,
        id: null,
        loading: false,
      };
    default:
      return state;
  }
}
