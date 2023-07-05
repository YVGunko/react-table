import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa("user:488d3d3b-fc56-4da8-9d49-e87044187a44")
  }
});