import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa(credentials)
  }
});