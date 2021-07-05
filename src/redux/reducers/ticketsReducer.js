import { actionTypes } from "../actionTypes";

export const ticketsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.getTickets:
      return { data: payload };
    case actionTypes.getTicket:
      return {
        messages: payload.messages,
        ticket: payload.ticket,
      };
    case actionTypes.getPesonal:
      return {
        personal: payload,
      };
    case actionTypes.ticketsRemove:
      return {};
    default:
      return state;
  }
};
