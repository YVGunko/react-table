import axios from "axios";
import GetCredentials from '../Token/GetCredentials';

const { credentials, setCredentials } = GetCredentials();

export default axios.create({
  
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa(GetCredentials)
  }
});

//"Authorization": 'Basic ' + btoa(credentials.name+':'+credentials.password)