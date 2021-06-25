import { actionTypes } from "../actionTypes";
import { db, firebase } from "../../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import moment from "moment";
//import Swal from "sweetalert2";

const ticketRef = db.collection("tickets");

export const createTicket = (ticket, message, photo) => {
  return async (dispatch) => {
    dispatch(startLoading());
    await ticketRef
      .add(ticket)
      .then(async (docRef) => {
        let subDocId = await ticketRef
          .doc(docRef.id)
          .collection("messages")
          .add(message);
        return { docId: docRef.id, subDocId: subDocId.id };
      })
      .then(({ docId, subDocId }) =>
        dispatch(uploadPhoto(photo, docId, subDocId))
      )
      .catch((err) => console.log(err));
  };
};

export const uploadPhoto = (photo, docId, subDocId) => {
  return async (dispatch) => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(photo.name);
    await imageRef.put(photo);
    const imageUrl = await imageRef.getDownloadURL();
    db.collection(`tickets/${docId}/messages`).doc(subDocId).update({
      image: imageUrl,
    });
    dispatch(finishLoading());
  };
};

export const getTickets = (data) => ({
  type: actionTypes.getTickets,
  payload: data,
});

export const getTicketsSnapshot = () => {
  return (dispatch) => {
    ticketRef.onSnapshot((querySnapshot) => {
      let tickets = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        tickets.push({
          ...data,
          requested: moment(data.requested.toDate()).calendar(),
          id: doc.id,
        });
      });
      dispatch(getTickets(tickets));
    });
  };
};

export const getTicket = (messages, ticket) => ({
  type: actionTypes.getTicket,
  payload: { messages, ticket },
});

export const getTicketSnapshot = (docId) => {
  return async (dispatch) => {
    let response = await ticketRef.doc(docId).get();

    let data = await db
      .collection(`tickets/${docId}/messages`)
      .orderBy("date", "asc")
      .get();

    let messages = [];
    data.forEach((doc) => {
      let docData = doc.data();
      messages.push({
        ...docData,
        date: moment(docData.date.toDate()).calendar(),
      });
    });
    let ticket = response.data();
    ticket = {
      ...ticket,
      requested: moment(ticket.requested.toDate()).calendar(),
    };
    dispatch(getTicket(messages, ticket));
  };
};

export const respondTicket = (docId, data) => {
  return async (dispatch) => {
    await db.collection(`tickets/${docId}/messages`).add(data);
  };
};

export const updateTicket = (docId, assigned) => {
  return async () => {
    await db.collection(`tickets`).doc(docId).update({
      assigned,
    });
  };
};

export const getPersonal = (personal) => ({
  type: actionTypes.getPesonal,
  payload: personal,
});

export const getPersonalQuery = () => {
  return async (dispatch) => {
    await db
      .collection("users")
      .where("rol", "==", "second_level")
      .get()
      .then((querySnapshot) => {
        let personal = [];
        querySnapshot.forEach((doc) => {
          personal.push(doc.data());
        });
        dispatch(getPersonal(personal));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
};

export const getMyTickets = (uid) => {
  return async (dispatch) => {
    await ticketRef
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        let tickets = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          tickets.push({
            ...data,
            requested: moment(data.requested.toDate()).calendar(),
            id: doc.id,
          });
        });
        dispatch(getTickets(tickets));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
};

export const getTicketsAssigned = (assigned) => {
  return async (dispatch) => {
    await ticketRef
      .where("assigned", "==", assigned)
      .get()
      .then((querySnapshot) => {
        let tickets = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          tickets.push({
            ...data,
            requested: moment(data.requested.toDate()).calendar(),
            id: doc.id,
          });
        });
        dispatch(getTickets(tickets));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
};
