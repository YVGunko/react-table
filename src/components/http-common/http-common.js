import axios from "axios";

export default axios.create()({ 
  baseURL: "http://localhost:4232/api",
});

//"Authorization": 'Basic ' + btoa(credentials.name+':'+credentials.password)