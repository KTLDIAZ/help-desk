import { actionTypes } from "../actionTypes";

const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.uiSetError:
      return {
        ...state,
        msgError: payload,
      };
    case actionTypes.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };
    case actionTypes.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
