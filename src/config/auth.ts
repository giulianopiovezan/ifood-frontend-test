interface AuthData {
  username: string;
  password: string;
  authorizationServer: string;
}

const {
  REACT_APP_AUTHORIZATION_USERNAME,
  REACT_APP_AUTHORIZATION_PASSWORD,
  REACT_APP_AUTHORIZATION_URL,
} = process.env;

export default {
  username: REACT_APP_AUTHORIZATION_USERNAME,
  password: REACT_APP_AUTHORIZATION_PASSWORD,
  authorizationServer: REACT_APP_AUTHORIZATION_URL,
} as AuthData;
