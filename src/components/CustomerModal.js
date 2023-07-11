import React, {useRef, useEffect, useState} from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import api from "../http-common";

//({handleSubmit, message, customer, show, setShow, header}) => {
const CustomerModal = (props) => {

    const { show, setShow, header } = props;

    const [customer, setCustomer ] = useState({
        name: {header},
        phone: '',
        email: '',
        id: ''
      });

    const handleClose = () => setShow(false);
    const handleChangeCustomer = event => {
        const target = event.currentTarget;
        console.log(`handleChangeCustomer`);
        setCustomer({
          ...customer, 
            [target.name]: target.value});
      }
     
    async function handleSubmit ( event ) {
           console.log("SUBMITTED! ", customer);
           let data= JSON.stringify({
            id:"new",
         name: customer.name,
         email: customer.email,
         phone: customer.phone,
       });
           if (event.preventDefault) event.preventDefault();
            await api.post("/customers", 
            JSON.stringify({
                id:"new",
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
           }) ).then((resp) => {
            console.log("response :- ",resp);
          })
          .catch((error) => {
            alert(error);
          });
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
                        <Form.Control type="text" onChange={handleChangeCustomer} name="name" placeholder="наименование..."/>           
                        <Form.Label>phone: </Form.Label>
                        <Form.Control type="phone" onChange={handleChangeCustomer} name="phone" placeholder="+7"/>
                        <Form.Label>e-mail: </Form.Label>
                        <Form.Control type="email" onChange={handleChangeCustomer} name="email" placeholder="ivanov@ivan.ru"/>           
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