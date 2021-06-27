import axios from "axios";

// const BASE_URL = "http://127.0.0.1:3000";
const BASE_URL = 'https://x-mail-main.herokuapp.com:3000';

export const GetUserInfo = () =>
  axios.get(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user-auth")}` },
  });

export const SignInGoogle = (body) =>
  axios.post(`${BASE_URL}/users/oauth`, body);

export const RegisterNew = (body) =>
  axios.post(`${BASE_URL}/users/register`, body);

export const SignIn = (body) => axios.post(`${BASE_URL}/users/login`, body);

export const ComposeEmail = (body) =>
  axios.post(`${BASE_URL}/email/schedule`, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("user-auth")}` },
  });
