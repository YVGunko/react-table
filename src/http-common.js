import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa("user:f72fe6d0-2f41-42a6-a5dc-7ab31bbe26f2")
  }
});