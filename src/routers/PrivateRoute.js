import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({
  isAuthenticathed,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticathed ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};
