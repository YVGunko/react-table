import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

import Login from '../Login/Login';
import TokenContext from '../Token/Token';
import useToken from '../Token/useToken';
import CustomerCrud from '../Customer/CustomerCrud';
import PriceCrud from '../Price/PriceCrud';
import NavigationBar from '../Nav/Navbar';
import {orderPath, pricePath} from '../http-common/baseURL';


function App() {
  const defaultTheme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },

      action: {
        active: '#001E3C',
      },

    },
  });
  
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <StyledEngineProvider injectFirst>
    <TokenContext.Provider value={token}>
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

    </TokenContext.Provider>
    </StyledEngineProvider>
  );
}

export default App;