import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getTicketSnapshot,
  getPersonalQuery,
} from "../../redux/actionCreators/ticket";
import { Conversation } from "./Conversation";
import { TicketPanel } from "./TicketPanel";

export const Ticket = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketSnapshot(match.params.id));
    dispatch(getPersonalQuery());
  }, [dispatch, match]);

  return (
    <div>
      <TicketPanel />
      <Conversation />
    </div>
  );
};
