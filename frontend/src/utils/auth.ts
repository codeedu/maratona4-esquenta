import Keycloak from "keycloak-js";

// @ts-ignore
const keycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON);
export const keycloak = Keycloak({
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig["realm"],
  clientId: keycloakConfig["resource"],
});
//login-required | check-sso
export const keycloakProviderInitConfig: Keycloak.KeycloakInitOptions = {
  onLoad: "check-sso"
};