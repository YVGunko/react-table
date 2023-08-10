import React, { useReducer, useState, useCallback, useRef, useContext, createContext } from "react";

import Split from '@uiw/react-split';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

import TokenContext from '../Token/Token';

import CustomerGrid from "../Customer/CustomerGrid";
import CustomerEdit from "../Customer/CustomerEdit";
import {fetchCustomer} from "../Customer/Customer";
import {isString, removeSpecials, isStringInValid } from '../../utils/utils';
import OrderCrud from "../Order/OrderCrud";

export const CustomerContext = createContext({});
CustomerContext.displayName = 'CustomerContext';

const CustomerCrud = () => {
  //const inputRef = useRef(null);
  const [scrnWidth, scrnHeight] = useWindowSize();
  let NavbarHeight = 100;
  const token = useContext(TokenContext);
  const isOrderMaker = token?.roles.toLowerCase().indexOf("order_maker".toLowerCase()) !== -1 ;
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [valid, setValid] = useState(false);
  const [input, setInput] = useState("");
  const [textToSearchFor, setTextToSearchFor] = useState("");

  function customerHasChanged(row) {
    console.log(`customerHasChanged =${row?.id}, ${row?.email}`);
    setSelectedCustomer(row);
  };
  function inputHasChanged(event) {
    event.preventDefault();
    //console.log(`inputHasChanged =${inputRef.current.value}`);
    //setTextToSearchFor(inputRef.current.value);
    setTextToSearchFor(textToSearchFor);
  };
  function personAdd(event) {
    event.preventDefault();
    //console.log(`personAdd =${inputRef.current.value}`);
    //setSelectedCustomer({id:'new', name: inputRef.current.value, email:"", phone:""});
    setSelectedCustomer({id:'new', name: textToSearchFor, email:"", phone:""});
  };
  const handleValidation = (e) => {
    setValid((isString(e.target.value) && !isStringInValid(e.target.value,1)));
    setInput(removeSpecials(e.target.value));
  };
  const onBlurValidateFormat = (e) => {
    console.log(`onBlurValidateFormat `);
    const value = e.target.value;
    const regex = /([a-zA-Z]{4})+-([0-9]{3})+([a-zA-Z]{2})+$/g;
    if (!value.match(regex)) {
      //Show an error message or put a warning text under the input and set flag to prevent form submit
    }
  }
  const textToSearchForChange =(event) => {
    console.log(`event.target.value is set to = ${event.target.value}`);
    setTextToSearchFor(event.target.value);

    if (event.preventDefault) event.preventDefault();
  }
    return (
      <div>
        <CustomerContext.Provider value={{selectedCustomer, setSelectedCustomer, customerHasChanged, textToSearchFor, setTextToSearchFor, }}>
        <Split style={{ position: "static", minHeight: scrnHeight-NavbarHeight, height: '100%', border: '1px solid #d5d5d5' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box component="form" onSubmit={inputHasChanged} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
              <InputBase 
                value={textToSearchFor}
                onChange={textToSearchForChange}
                variant="standard"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск клиента"
                autoFocus
                color="primary"
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={inputHasChanged} >
                <PersonSearchOutlinedIcon />
              </IconButton>
              <Divider sx={{ height: "90%", m: 1 }} orientation="vertical" />
              {isOrderMaker && (<IconButton color="primary" sx={{ p: '10px' }} aria-label="personAdd" onClick={personAdd}>
                <PersonAddIcon />
              </IconButton>)}
            </Box>
            <div style={{ width: '100%' }}>
            <CustomerGrid  />
          </div>
          </Container>


          <div style={{ flex: 1 }}>
          <Split disable mode="vertical">
            <div>
              <CustomerEdit />
            </div>
            <div>
              <OrderCrud />

            </div>
          </Split>
          </div>
        </Split>
        </CustomerContext.Provider>
      </div>
    );
}
export default CustomerCrud;