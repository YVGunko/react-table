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
import TokenContext from '../Token/Token';

import CustomerGrid from "../Customer/CustomerGrid";
import CustomerEdit from "../Customer/CustomerEdit";
import {fetchCustomer} from "../Customer/Customer";

export const CustomerContext = createContext({});
CustomerContext.displayName = 'CustomerContext';

const PriceCrud = () => {
  //const inputRef = useRef(null);
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
    setTextToSearchFor(input);
  };
  function personAdd(event) {
    event.preventDefault();
    //console.log(`personAdd =${inputRef.current.value}`);
    //setSelectedCustomer({id:'new', name: inputRef.current.value, email:"", phone:""});
    setSelectedCustomer({id:'new', name: input, email:"", phone:""});
  };
  const handleValidation = (e) => {
    const reg = new RegExp("[a-zA-Za-åa-ö-w-я 0-9]");
    setValid(reg.test(e.target.value));
    setInput(e.target.value);
  };
    return (
      <div>
        <CustomerContext.Provider value={{selectedCustomer, setSelectedCustomer, customerHasChanged, textToSearchFor, setTextToSearchFor, }}>
        <Split style={{ position: "static", height: '100%', border: '1px solid #d5d5d5' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box component="form" onSubmit={inputHasChanged} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
              <InputBase 
                value={input}
                inputProps={{ pattern: "[a-zA-Za-åa-ö-w-я 0-9]" }}
                onChange={(e) => handleValidation(e)}
                error={!valid}
                required={true}
                variant="outlined"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск клиента"
                
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={inputHasChanged} >
                <PersonSearchOutlinedIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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
              <div>selectedCustomer?.name: {selectedCustomer?.name}</div>
              <div>textToSearchFor: {textToSearchFor}</div>

            </div>
          </Split>
          </div>
        </Split>
        </CustomerContext.Provider>
      </div>
    );
}
export default PriceCrud;