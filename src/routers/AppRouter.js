import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { Login } from "./../components/auth/Login";
import { TicketForm } from "./../components/tickets/TicketForm";
import { PrivateRoute } from "./PrivateRoute";
import PersistentDrawerLeft from "../components/ui/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../firebase/firebaseConfig";
import { getRol } from "../redux/actionCreators/auth";
import { Register } from "./../components/auth/Register";
import { Ticket } from "../components/tickets/Ticket";
import { MyTickets } from "./../components/tickets/MyTickets";
import { TicketsAssigned } from "./../components/tickets/TicketsAssigned";
import { AllTickets } from "./../components/tickets/AllTickets";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(getRol(user.uid));

        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setChecking(false);
    });
  }, [dispatch]);

  const { rol } = useSelector((state) => state.auth);

  if (checking) {
    return <h1>Wait...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticathed={isLogged}
            path="/auth/login"
            component={Login}
          />
          <PublicRoute
            isAuthenticathed={isLogged}
            path="/auth/register"
            component={Register}
          />
          <PersistentDrawerLeft>
            <PrivateRoute
              isAuthenticathed={isLogged}
              exact
              path="/"
              component={TicketForm}
            />
            <PrivateRoute
              isAuthenticathed={isLogged}
              exact
              path="/ticket/:id"
              component={Ticket}
            />
            <PrivateRoute
              isAuthenticathed={isLogged}
              exact
              path="/mytickets"
              component={MyTickets}
            />
            {rol !== "user" && (
              <>
                <PrivateRoute
                  isAuthenticathed={isLogged}
                  exact
                  path="/tickets"
                  component={AllTickets}
                />
                <PrivateRoute
                  isAuthenticathed={isLogged}
                  exact
                  path="/tickets/assigned"
                  component={TicketsAssigned}
                />
              </>
            )}
          </PersistentDrawerLeft>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
