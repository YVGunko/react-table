import { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import  api  from "../http-common/http-common";
import TokenContext from '../Token/Token';
import { CustomerContext } from '../Customer/CustomerCrud';
const orderURL = `/orders?customerId=`;

export default function useOrder() {
    const token = useContext(TokenContext);
    const {selectedCustomer} = useContext(CustomerContext);
    const [fetchedData, setFetchedData] = useState();
    let id = selectedCustomer.id ? selectedCustomer.id : 0;

    const fetchData = useCallback(async () => {
        console.log(`useOrder()  fetchData ${selectedCustomer}`);
    return api(`${orderURL}${id}`, 'GET', token)
    .then(fetchedData => {
        setFetchedData(fetchedData);
    })
    .catch((error) => {
      console.log(`useOrder()  fetchData ${JSON.stringify(error)}`);
      return(error);
      })

  }, [selectedCustomer,token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  const fakeData = {
  "totalItems": 0,
  "totalPages": 0,
  "currentPage": 0,
  "orders": [
      {
          "id": "",
          "comment": "",
          "details": "...",
          "customer_id": "",
          "division_code": "",
          "division_name": "...",
          "user_id": "",
          "user_name": "",
          "sample": false,
          "date": ""
      },
    ]}
    
  return {
    fetchedData,
    fakeData
  }
}