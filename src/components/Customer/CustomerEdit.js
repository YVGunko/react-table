import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import api from "../http-common/http-common";
import { CustomerContext } from './Customer';
import TokenContext from '../Token/Token';


const CustomerEdit= () => {
    const token = useContext(TokenContext);
    const customer = useContext(CustomerContext);
    const [submitting, setSubmitting] = useState(false);
    const handleChangeCustomer = event => {
        const target = event.currentTarget;
        console.log(`handleChangeCustomer: id=${customer.id}, name=${customer.name}, phone=${customer.phone}`);
        setCustomer({
          ...customer, 
            [target.name]: target.value});
      }
 
      async function handleSubmitCustomer ( event ) {
        console.log("handleSubmitCustomer! ", customer);
        setSubmitting(true);
        if (event.preventDefault) event.preventDefault();
         await api("/customers", 'POST', token, 
         JSON.stringify({
             id:"new",
             name: customer.name,
             email: customer.email,
             phone: customer.phone,
        }) ).then((resp) => {
         console.log("response :- ",resp);
         setCustomer({
             ...customer, 
               id: resp.data.id,
               name: resp.data.name,
               email: resp.data.email,
               phone: resp.data.phone});
          setSubmitting(false);
          //console.log(`handleSubmitCustomer: id=${customer.id}, name=${customer.name}, phone=${customer.phone}`);
       })
       .catch((error) => {
          setSubmitting(false);
          alert(error);
       });
    }
    async function handleNewOrder(id) {
        //if (event.preventDefault) event.preventDefault();
        console.log(`newOrder for customer.id=${id}`);
        //await api.post(`/customers/orders/${id}`)
        await api(`/customers/orders/${id}`, 'POST', token)
        .then((data) => {
          console.log("response :- ",data);
          setCustomer({
              ...customer, 
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone});
           setSubmitting(false);
           //console.log(`handleSubmitCustomer: id=${customer.id}, name=${customer.name}, phone=${customer.phone}`);
        })
        .catch((error) => {
           setSubmitting(false);
           alert(error);
        });
    
      }
 return (
         <>            
            <Box sx={{ height: '100%', width: '100%', 
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7], }}}>
                <FormGroup>
                    <TextField required id="customer-name" label="Наименование" defaultValue="наименование..." type="text"
                        value={customer.name || ''} 
                        onChange={handleChangeCustomer} 
                    />
                    <TextField required id="customer-phone" label="Наименование" type="phone" placeholder="+7"
                        value={customer.phone || ''} 
                        onChange={handleChangeCustomer} 
                    />
                    <TextField required id="customer-email" label="Наименование" type="email" placeholder="ivanov@ivan.ru"
                        value={customer.email || ''} 
                        onChange={handleChangeCustomer} 
                    />         
                </FormGroup>

                <Button disabled={submitting} variant="primary" onClick={handleSubmitCustomer}>
                    Сохранить
                </Button>
            </Box>
         </>
     )
 }

 export default CustomerEdit;