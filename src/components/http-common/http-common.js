import React, { useState } from 'react';
import axios from "axios";
import useToken from '../Token/useToken';
import Login from '../Login/Login';

const { token, setToken } = useToken();

async function callLogin() {
  
  if(!token) {
    return <Login setToken={setToken} />
  }
 }

export default axios.create({
  
  baseURL: "http://localhost:4232/api",

  headers: {
    "Content-type": "application/json",
    "Authorization": 'Basic ' + btoa(token)
  }
});