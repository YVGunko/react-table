import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4232/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa("user:ad50c8e9-14cf-4c7e-87d0-f02331192c37")
  }
});