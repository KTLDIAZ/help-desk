import { actionTypes } from "../actionTypes";

export const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.login:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.logout:
      return {};
    default:
      return state;
  }
};
