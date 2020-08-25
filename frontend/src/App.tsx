import React from "react";
import { KeycloakProvider } from "@react-keycloak/web";
import { keycloak, keycloakProviderInitConfig } from "./utils/auth";
import { AppRouter } from "./AppRouter";
//JSX
function App() {
  return (
    <KeycloakProvider keycloak={keycloak} initConfig={keycloakProviderInitConfig} >
      <AppRouter/>
    </KeycloakProvider>
  );
}

export default App;
