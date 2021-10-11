import jwtDecode from 'jwt-decode';

const TOKEN_NAME = 'token';

const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};
const setToken = token => {
  return localStorage.setItem(TOKEN_NAME, token);
};
const removeToken = () => {
  return localStorage.removeItem(TOKEN_NAME);
};
const user = getToken() ? jwtDecode(getToken()) : null;

export { getToken, setToken, removeToken, user };
