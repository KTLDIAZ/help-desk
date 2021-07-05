import { actionTypes } from "../actionTypes";
import { db, firebase } from "../../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import moment from "moment";

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
      .then(({ docId, subDocId }) => {
        if (photo) {
          dispatch(uploadPhoto(photo, docId, subDocId));
        } else {
          dispatch(finishLoading());
        }
        window.location = `#/ticket/${docId}`;
      })
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
  return async (dispatch) => {
    await ticketRef.get((querySnapshot) => {
      console.log("tickets");
      let tickets = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        tickets.push({
          ...data,
          requested: moment(data.requested.toDate()).calendar(),
          id: doc.id,
        });
      });
      console.log(tickets);
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
    let ticket;
    ticketRef.doc(docId).onSnapshot((response) => {
      ticket = response.data();
      ticket = {
        ...ticket,
        requested: moment(ticket.requested.toDate()).calendar(),
      };
    });
    let messages = [];

    db.collection(`tickets/${docId}/messages`)
      .orderBy("date", "asc")
      .onSnapshot((data) => {
        data.forEach((doc) => {
          let docData = doc.data();
          messages.push({
            ...docData,
            date: moment(docData.date.toDate()).calendar(),
          });
          dispatch(getTicket(messages, ticket));
        });
      });
  };
};

export const respondTicket = (docId, data) => {
  return async (dispatch) => {
    await db.collection(`tickets/${docId}/messages`).add(data);
  };
};

export const updateTicketStatus = (docId, status) => {
  return async () => {
    await db.collection(`tickets`).doc(docId).update({
      status,
    });
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
        console.log("getmytickets");
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
        console.log("assigned");
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

export const ticketRemove = () => ({
  type: actionTypes.ticketsRemove,
});
