import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa("user:ad305978-c20c-45f8-87ae-62a521b0907e")
  }
});