import { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import  api  from "../http-common/http-common";
import TokenContext from '../Token/Token';
import { CustomerContext } from '../Customer/CustomerCrud';
import { OrderContext } from "../Order/order-context";
const orderURL = `/orders?customerId=`;

export default function useOrder( paginationModel ) {
    const token = useContext(TokenContext);
    const {selectedCustomer} = useContext(CustomerContext);

    const [fetchedData, setFetchedData] = useState();
    let id = selectedCustomer ? selectedCustomer.id : 0;

    const fetchData = useCallback(async () => {
        console.log(`useOrder()  fetchData ${id}, paginationModel=${paginationModel ? paginationModel.page : 0}`);
    return api(`${orderURL}${id}&page=${paginationModel ? paginationModel.page : 0}&size=${paginationModel ? paginationModel.pageSize : 5}`, 'GET', token)
    .then(fetchedData => {
        setFetchedData(fetchedData);
    })
    .catch((error) => {
      console.log(`useOrder()  fetchData ${JSON.stringify(error)}`);
      return(error);
      })

  }, [selectedCustomer, token, paginationModel]);

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