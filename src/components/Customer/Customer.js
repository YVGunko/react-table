import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import  api  from "../http-common/http-common";
import TokenContext from '../Token/Token';
//export const CustomerContext = createContext();

async function handleDeleteCustomer( id, token ) {
  await api(`/customers/${id}`, 'DELETE', token);
}
async function handleSubmitCustomer ( customer, token ) {
  //setSubmitting(true);

  await api("/customers", 'POST', token, 
   JSON.stringify({
       id: customer.id,
       name: customer.name,
       email: customer.email,
       phone: customer.phone,
  }) ).then((resp) => {
   console.log("response :- ",resp?.data);
   //setSubmitting(false);
   return resp?.data;
 })
 .catch((error) => {
    //setSubmitting(false);
    console.log(`handleSubmitCustomer error: ${error}`);
 });
}

export default function useCustomer(id) {
  const token = useContext(TokenContext);

  const getCustomer = (id) =>  {
    console.log(`useCustomer.getCustomer Url=/customers/${id}`);
    api(`/customers/${id}`, 'GET', token)
    .then(data => {
      console.log(`useCustomer.getCustomer data=${data?.id}`);
      const thisCustomer = data;
      return thisCustomer;
    })
    .catch((error) => {
      const thisCustomer = {
        name: 'Ошибка при получении данных пользователя',
        phone: '',
        email: '',
        id: '',
      };
      return thisCustomer
    });
  }

  const [ customer, setCustomer ] = useState(getCustomer(id));

  const saveCustomer = thisCustomer => {
    console.log(`useCustomer.saveCustomer customers${customer}`);
    setCustomer(thisCustomer);
    handleSubmitCustomer(customer, token);
  };

  const deleteCustomer = (id) => {
    console.log(`useCustomer.deleteCustomer customers${id}`);
    handleDeleteCustomer(id, token);
  };

  return {
    setCustomer: saveCustomer,
    customer
  }
}

useCustomer.propTypes = {
  id: PropTypes.string.isRequired
};
