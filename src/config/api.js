import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const urlAsset = {
  avatar: "http://localhost:5000/public/avatars/",
  thumbnail: "http://localhost:5000/public/thumbnails/",
  file: "http://localhost:5000/public/files/",
};
