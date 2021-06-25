import { actionTypes } from "../actionTypes";
import { firebase, db } from "../../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";

export const login = (uid, displayName, rol) => ({
  type: actionTypes.login,
  payload: {
    uid,
    displayName,
    rol,
  },
});

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(login(user.uid, user.displayName, doc.data().rol));
              dispatch(finishLoading());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((err) => {
        dispatch(finishLoading());
        console.log(err);
        Swal.fire("Error", err.message, "error");
      });
  };
};

export const startRegisterWithEmailPassword = (name, email, password, rol) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: name,
        });
        db.collection("users")
          .doc(user.uid)
          .set({ rol, name })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        dispatch(login(user.uid, name, rol));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: actionTypes.logout,
});
