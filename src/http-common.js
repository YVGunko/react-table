import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa("user:6651062b-b53f-4d96-a894-c9c5c45db015")
  }
});