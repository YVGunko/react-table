import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//import api from "../http-common/http-common";
import { submitCustomer } from './Customer';
//import TokenContext from '../Token/Token';
import  {CustomerProvider, useCustomer} from './customer-context';
//import {CustomerContext} from '../Price/PriceCrud';

const CustomerEdit = () => {
    //const token = useContext(TokenContext);
    //const {customer} = useCustomer();
    //const [customer, setCustomer] = useState(selectedCustomer);
    //const [submitting, setSubmitting] = useState(false);
    
 /*
    React.useEffect(() => {      
        console.log(`CustomerEdit: useEffect selectedCustomer?.email=${customer?.email}`);
        setCustomer((prevCustomer) =>
        customer !== undefined
            ? customer
            : prevCustomer,
        );
      }, [customer, setCustomer]);



    async function handleSubmit ( event ) {
        setSelectedCustomer(customer);
        console.log("handleSubmitCustomer! ", selectedCustomer);
        submitCustomer (customer, token);
        //setSubmitting(true);
        if (event.preventDefault) event.preventDefault();
        //Customer(customer.id).setCustomer({customer});
    }*/
    const SubmitButton = React.memo(function Submit() {
      const {saveCustomer} = useCustomer()
      console.log(`CustomerEdit SubmitButton `);
      return (
        <Button onClick={saveCustomer}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Сохранить
      </Button>
      )
    })
    const EditForm = React.memo(function Edit() {
      const {customer, setCustomer} = useCustomer();
      console.log(`CustomerEdit function Edit() value= ${customer?.name}`);
      const handleChange = event => {
        const target = event.currentTarget;
        setCustomer({
          ...customer, 
            [target.name]: target.value});
        console.log(`handleChangeCustomer: prop=${target.name}, value=${target.value}`); 
    }
      return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
                value={customer?.name || ''} 
              margin="normal"
              required
              fullWidth
              id="name"
              label="Наименование клиента"
              name="name"
              placeholder="name"
              autoFocus
              onChange={handleChange} 
            />
            <TextField
                value={customer?.email || ''} 
              margin="normal"
              fullWidth
              id="email"
              label="адрес email"
              name="email"
              type="email" 
              placeholder="ivanov@ivan.ru"
              onChange={handleChange} 
            />
            <TextField
                value={customer?.phone || ''} 
              margin="normal"
              fullWidth
              id="phone"
              label="номер телефона"
              name="phone"             
              type="phone"              
              placeholder="+7"
              onChange={handleChange} 
            />
            <SubmitButton />
          </Box>
      </Container>
      )
    })
    
 return (
    <CustomerProvider > 
      <EditForm />
    </CustomerProvider>
     )
 }

 export default CustomerEdit;

 /*
         <>            
            <Box sx={{ height: '100%', width: '100%', 
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7], }}}>
                <FormGroup>
                    <TextField required id="customer-name" label="Наименование" defaultValue="наименование..." type="text"
                        value={selectedCustomer.name || ''} 
                        onChange={handleChangeCustomer} 
                    />
                    <TextField required id="customer-phone" label="Телефон" type="phone" placeholder="+7"
                        value={selectedCustomer.phone || ''} 
                        onChange={handleChangeCustomer} 
                    />
                    <TextField required id="customer-email" label="e-mail" type="email" placeholder="ivanov@ivan.ru"
                        value={selectedCustomer.email || ''} 
                        onChange={handleChangeCustomer} 
                    />         
                </FormGroup>

                <Button disabled={submitting} variant="primary" onClick={handleSubmitCustomer}>
                    Сохранить
                </Button>
            </Box>
         </>
 */