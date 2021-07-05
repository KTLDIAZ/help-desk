import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyTickets, ticketRemove } from "../../redux/actionCreators/ticket";
import { TableTickets } from "./TableTickets";
import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";

export const MyTickets = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () =>
      await db
        .collection("tickets")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
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
          console.error("Error getting documents: ", error);
        });

    if (uid && data === null) fetchData();

    // if (uid) dispatch(getMyTickets(uid));
    return () => {
      dispatch(ticketRemove());
    };
  }, [dispatch, uid, data]);
  console.log(data);

  return <TableTickets data={data} tittle="Mis tickets" />;
};
