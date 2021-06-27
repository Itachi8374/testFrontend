import http from "./httpService";
import jwtDecode from "jwt-decode";
import apiUrl from "../config.json";

const apiEndpoint = apiUrl.apiEndpoint + "user";

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  getCurrentUser,
};
