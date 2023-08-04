import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Login from '../Login/Login';
import TokenContext from '../Token/Token';
import useToken from '../Token/useToken';
import CustomerCrud from '../Customer/CustomerCrud';
import PriceCrud from '../Price/PriceCrud';
import NavigationBar from '../Nav/Navbar';
import {orderPath, pricePath} from '../http-common/baseURL';


function App() {
  const defaultTheme = createTheme();
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
    <TokenContext.Provider value={token}>
    <div style={{ height: '100vh', width: '100vw', position: 'absolute', left: '0px', overflow: 'hidden'}}>
      <BrowserRouter>
        <NavigationBar token={token} />
        <Switch>
          <Route path={orderPath}>
            <CustomerCrud />
          </Route>
          <Route path={pricePath}>
            <PriceCrud />
          </Route>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    </TokenContext.Provider>
    </ThemeProvider>
  );
}

export default App;