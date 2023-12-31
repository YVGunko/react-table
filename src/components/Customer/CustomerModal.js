import React from 'react'
import { Modal, Button, Form } from "react-bootstrap";

const CustomerModal = (props) => {

    const { show, setShow, customer, handleChangeCustomer, handleSubmitCustomer, handleNewOrder, header, submitting } = props;

    const handleClose = () => setShow(false);  

  
 return (
         <>            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                {submitting && <Modal.Title>"Сохраняю..."</Modal.Title>}
                {!submitting && <Modal.Title>{header}</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Label>Наименование: </Form.Label>
                        <Form.Control type="text" value={customer.name || ''} onChange={handleChangeCustomer} name="name" placeholder="наименование..."/>           
                        <Form.Label>phone: </Form.Label>
                        <Form.Control type="phone" value={customer.phone || ''} onChange={handleChangeCustomer} name="phone" placeholder="+7"/>
                        <Form.Label>e-mail: </Form.Label>
                        <Form.Control type="email" value={customer.email || ''} onChange={handleChangeCustomer} name="email" placeholder="ivanov@ivan.ru"/>           
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer disabled={submitting}>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSubmitCustomer}>
                    Сохранить
                </Button>
                <Button disabled={customer.id === null} variant="success" onClick={handleNewOrder}>
                    Создать заказ
                </Button>
                </Modal.Footer>
            </Modal>
         </>
     )
 }

 export default CustomerModal;