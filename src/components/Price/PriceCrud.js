import React, { useReducer, useState, useCallback, useRef, useContext, createContext } from "react";

import Split from '@uiw/react-split';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import TokenContext from '../Token/Token';
import CustomerGrid from "../Customer/CustomerGrid";
import CustomerEdit from "../Customer/CustomerEdit";
import {CustomerProvider, useCustomer} from '../Customer/customer-context';

const PriceCrud = () => {
  const inputRef = useRef();
  const token = useContext(TokenContext);
  const isOrderMaker = token?.roles.toLowerCase().indexOf("order_maker".toLowerCase()) !== -1 ;

    return (
      <CustomerProvider>
      <div>
        <Split disable style={{ position: "static", height: '100%', border: '1px solid #d5d5d5' }}>
          <div style={{ minWidth: '35%', maxWidth: '35%', backgroundColor: '#eaeaea' }}>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase ref={inputRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск клиента"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              {isOrderMaker && (<IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <PersonAddIcon />
              </IconButton>)}
            </Box>
            <CustomerGrid textToSearchFor={inputRef} />
          </Container>
            
      </div>

          <div style={{ flex: 1 }}>
          <Split disable mode="vertical">
            <div>
              <CustomerEdit />
            </div>
            <div>
              Bottom Pane
            </div>
          </Split>
          </div>
        </Split>
      </div>
      </CustomerProvider>
    );
}
export default PriceCrud;