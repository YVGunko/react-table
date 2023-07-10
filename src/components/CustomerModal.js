import React, {useRef, useEffect, useState} from 'react'
import { Modal, Button, Form } from "react-bootstrap";

//({handleSubmit, message, customer, show, setShow, header}) => {
const CustomerModal = (props) => {

    const { customer, setCustomer, show, setShow, header } = props;

    //const [customer, setCustomer] = useState('');

    const handleClose = () => setShow(false);
    const handleChangeCustomer = event => {
        const target = event.currentTarget;
        console.log(`handleChangeCustomer`);
        setCustomer({
          ...customer, 
            [target.name]: target.value});
      }
     
       const handleSubmit = () => {
           console.log("SUBMITTED! ", customer);
       }
  
 return (
         <>            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Label>Наименование: </Form.Label>
                        <Form.Control type="text" onChange={handleChangeCustomer} value={customer.name} placeholder="наименование..."/>           
                        <Form.Label>phone: </Form.Label>
                        <Form.Control type="phone" onChange={handleChangeCustomer} value={customer.phone} placeholder="+7"/>
                        <Form.Label>e-mail: </Form.Label>
                        <Form.Control type="email" onChange={handleChangeCustomer} value={customer.email} placeholder="ivanov@ivan.ru"/>           
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
                </Modal.Footer>
            </Modal>
         </>
     )
 }

 export default CustomerModal;