import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import api from "../http-common/http-common";
//import { CustomerContext } from './Customer';
import TokenContext from '../Token/Token';
import Customer from './Customer';


const CustomerEdit = () => {
    const token = useContext(TokenContext);
    //const customer = useContext(CustomerContext);
    const [customer, setCustomer] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChangeCustomer = event => {
        const target = event.currentTarget;
        //console.log(`handleChangeCustomer: id=${Customer.customer.id}, name=${customer.name}, phone=${customer.phone}`);
        setCustomer({
          ...customer, 
            [target.name]: target.value});
      }
 
    async function handleSubmitCustomer ( event ) {
        console.log("handleSubmitCustomer! ", customer);
        //setSubmitting(true);
        if (event.preventDefault) event.preventDefault();
        Customer(customer.id).setCustomer({customer});
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