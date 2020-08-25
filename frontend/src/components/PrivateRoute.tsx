// @flow
import * as React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { keycloak } from "../utils/auth";
interface PrivateRouteProps extends RouteProps {}
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { component, ...other } = props;
  const Component: any = component;
  return (
    <Route
      {...other}
      render={(props) => {
        return keycloak.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: props.location}
            }}
          />
        );
      }}
    />
  );
};
