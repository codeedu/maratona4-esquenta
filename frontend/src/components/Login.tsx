// @flow
import * as React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation, Redirect } from "react-router-dom";
type Props = {};
export const Login = (props: Props) => {
  const { keycloak } = useKeycloak();
  const location = useLocation();

  //@ts-ignore
  const { from } = location.state || { from: { pathname: "/" } };
  if (keycloak?.authenticated) {
    return <Redirect to={from} />;
  } else {
    keycloak?.login();
    return <div>Carregando...</div>;
  }
};
