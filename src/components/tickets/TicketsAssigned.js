import React, { useEffect, useState } from "react";
import { TableTickets } from "./TableTickets";
import {
  getTicketsAssigned,
  ticketRemove,
} from "./../../redux/actionCreators/ticket";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/firebaseConfig";

export const TicketsAssigned = () => {
  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.auth);

  // const { data } = useSelector((state) => state.tickets);

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () =>
      await db
        .collection("tickets")
        .where("assigned", "==", displayName)
        .get()
        .then((querySnapshot) => {
          console.log("assigned");
          let tickets = [];
          querySnapshot.forEach((doc) => {
            tickets.push({
              ...doc.data(),
              requested: "sadasdasd",
              id: doc.id,
            });
          });
          setData(tickets);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

    if (displayName && data === null) fetchData();

    // if (displayName) dispatch(getTicketsAssigned(displayName));
    return () => {
      dispatch(ticketRemove());
    };
  }, [dispatch, displayName, data]);
  console.log(data);

  return <TableTickets data={data} tittle="Tickets Asignados" />;
};
