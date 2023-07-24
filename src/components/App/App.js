import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerCrud from "../Customer/CustomerCrud";
import Login from '../Login/Login';
import TokenContext from '../Token/Token';
import useToken from '../Token/useToken';
import GetCredentials from '../Token/GetCredentials';

function App() {
  /*const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }*/
  return (
    <TokenContext.Provider value={GetCredentials}>
      <div>
        <h1 className="text-center">Клиенты и заказы</h1>
        <CustomerCrud />
      </div>
    </TokenContext.Provider>
  );
}

export default App;