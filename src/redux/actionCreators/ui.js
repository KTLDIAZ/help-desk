import { actionTypes } from "../actionTypes";

export const setError = (error) => ({
  type: actionTypes.uiSetError,
  payload: error,
});

export const removeError = () => ({
  type: actionTypes.uiRemoveError,
});

export const startLoading = () => ({
  type: actionTypes.uiStartLoading,
});

export const finishLoading = () => ({
  type: actionTypes.uiFinishLoading,
});
