import { actionTypes } from "../actionTypes";

export const ticketsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.getTickets:
      return { ...state, data: payload };
    case actionTypes.getTicket:
      return { ...state, messages: payload.messages, ticket: payload.ticket };
    case actionTypes.getPesonal:
      return {
        ...state,
        personal: payload,
      };
    default:
      return state;
  }
};
