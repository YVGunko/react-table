import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from 'axios';

export const CstmrModal = () => {

       const [customer, setCustomer] = useState('');
     
       const handleChangeCustomer = event => {
        const target = event.currentTarget;
        console.log(`handleChangeCustomer`);
        setCustomer({
          ...customer, 
            [target.name]: target.value});
      }
     
       const handleSubmitEmail = () => {
           console.log("SUBMITTED! ", customer);
       }
      
       return (<div className='d-flex flex-column align-items-center'>
           <Form style={{ width: '20rem', paddingTop: '2rem'}}>
               <Form.Group>
                    <Form.Label>Enter Your Name</Form.Label>
                   <Form.Control type='text' value={customer.name} onChange={handleChangeCustomer}/>
                   <Form.Label>Enter Your Phone</Form.Label>
                   <Form.Control type='phone' value={customer.phone} onChange={handleChangeCustomer}/>
                   <Form.Label>Enter Your Email</Form.Label>
                   <Form.Control type='email' value={customer.email} onChange={handleChangeCustomer}/>
               </Form.Group>
               <Button type='submit' onClick={handleSubmitEmail} style={{marginTop: '2rem'}}>Submit Form</Button>
           </Form>
       </div>)
    }
 export default CstmrModal;