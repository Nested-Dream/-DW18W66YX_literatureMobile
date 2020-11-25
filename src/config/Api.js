import axios from "axios";

export const API = axios.create({
  baseURL: "https://literature-be.herokuapp.com/api/v1",
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export const urlAsset = {
  photo: "https://res.cloudinary.com/rizkyiqbal/",
  file: "https://res.cloudinary.com/rizkyiqbal/raw/upload/",
};
