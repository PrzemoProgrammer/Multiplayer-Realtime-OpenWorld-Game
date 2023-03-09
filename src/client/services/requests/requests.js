import { requestGet, requestPost } from "./helper";

export const LOGIN = (data) => {
  return requestPost(data, "login");
};

export const REGISTER = (data) => {
  return requestPost(data, "register");
};
