import React, { useReducer, useState, useCallback, useRef, useContext, createContext } from "react";

import Split from '@uiw/react-split';
import TokenContext from '../Token/Token';

import CustomerGrid from "../Customer/CustomerGrid";
import CustomerEdit from "../Customer/CustomerEdit";
import {fetchCustomer} from "../Customer/Customer";

export const CustomerContext = createContext({});
CustomerContext.displayName = 'CustomerContext';

const PriceCrud = () => {
  const token = useContext(TokenContext);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const fakeRows = { id: 1, name: 'Нет доступа к данным о клиентах', phone: '...', email:"..." };
  const [textToSearchFor, setTextToSearchFor] = useState("");

  /*const customerHasChanged = useCallback(async (id) => {
    console.log(`customerHasChanged =${id}`);
    fetchCustomer(id , token).then(data => {
      console.log(`customerHasChanged =${id}`);
      setSelectedCustomer(data)});
  }, []);

  function customerHasChanged(id) {
    console.log(`customerHasChanged =${id}`);
    const dustomer = async () => {
      fetchCustomer(id , token);
      setSelectedCustomer(fakeRows);
    }
  };*/
  function customerHasChanged(row) {
    console.log(`customerHasChanged =${row?.id}, ${row?.email}`);
    setSelectedCustomer(row);
  };
    return (
      <div>
        <CustomerContext.Provider value={{selectedCustomer, setSelectedCustomer, customerHasChanged}}>
        <Split disable style={{ position: "static", height: '100%', border: '1px solid #d5d5d5' }}>
          <div style={{ minWidth: '35%', maxWidth: '35%', backgroundColor: '#eaeaea' }}>
            <CustomerGrid textToSearchFor={textToSearchFor} />
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
        </CustomerContext.Provider>
      </div>
    );
}
export default PriceCrud;