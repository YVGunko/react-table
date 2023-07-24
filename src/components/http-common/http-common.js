import axios from "axios";
import { baseURL } from "./baseURL";
const api = (credentials) =>axios.create()({ 
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'Basic ' + btoa(credentials.name+':'+credentials.password)
  }
});

export default api;
//