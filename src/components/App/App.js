import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerCrud from "../Customer/CustomerCrud";
import Login from '../Login/Login';
import TokenContext from '../Token/Token';
import useToken from '../Token/useToken';


function App() {
  const { token, setToken } = useToken();
  if(!token) {
    console.log(`App, token isn't defined, exactly is =${token}`);
    return <Login setToken={setToken} />
  }
  return (
    <TokenContext.Provider value={token}>
      <div>
        <h1 className="text-center">Клиенты и заказы</h1>
        <CustomerCrud />
      </div>
    </TokenContext.Provider>
  );
}

export default App;