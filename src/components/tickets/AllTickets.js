import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import {
  getTicketsSnapshot,
  ticketRemove,
} from "../../redux/actionCreators/ticket";
import { TableTickets } from "./TableTickets";

export const AllTickets = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () =>
      await db.collection("tickets").get((querySnapshot) => {
        let tickets = [];
        querySnapshot.forEach((doc) => {
          tickets.push({
            ...doc.data(),
            requested: "sadasdasd",
            id: doc.id,
          });
        });
        setData(tickets);
      });
    if (data === null) fetchData();
    // dispatch(getTicketsSnapshot());
    return () => {
      dispatch(ticketRemove());
    };
  }, [dispatch, data]);
  console.log(data);

  return <TableTickets data={data} tittle="Tickets" />;
};
