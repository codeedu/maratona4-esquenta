// @flow
import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Room } from "./components/Room";
import { Chat } from "./components/Chat";
import { useKeycloak } from "@react-keycloak/web";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
type Props = {};
export const AppRouter = (props: Props) => {
  const {initialized} =  useKeycloak();

  if(!initialized){
      return <div>Carregando...</div>
  }  

  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login} exact={true}/>
        <PrivateRoute path="/" component={Room} exact={true}/>
        <PrivateRoute path="/chat" component={Chat} exact={true}/>
      </Switch>
    </BrowserRouter>
  );
};
