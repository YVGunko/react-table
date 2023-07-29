import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Login from '../Login/Login';
import TokenContext from '../Token/Token';
import useToken from '../Token/useToken';
import CustomerCrud from '../Customer/CustomerCrud';
import PriceCrud from '../Price/PriceCrud';


function App() {
  const { token, setToken } = useToken();
  if(!token) {
    console.log(`App, token isn't defined, exactly is =${token}`);
    return <Login setToken={setToken} />
  }
  return (
    <TokenContext.Provider value={token}>
    <div className="App">
      <h1>Marine Mammals</h1>
      <div>
          Добро пожаловать, {token.username}
        </div>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/customer">CustomerCrud</Link></li>
            <li><Link to="/price">PriceCrud</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/customer">
            <CustomerCrud />
          </Route>
          <Route path="/price">
            <PriceCrud />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
    </TokenContext.Provider>
  );
}

export default App;