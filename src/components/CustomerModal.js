import React, {useState, useEffect} from 'react'
import { Modal, Button } from "react-bootstrap";


export default function CustomerModal(props){
    const {show, toggleShow} = props
 return (
         <>            
             <Modal show={show} onHide={toggleShow}>
  <Modal.Header closeButton>
  <Modal.Title>{props.header}</Modal.Title>
  </Modal.Header>
  <Modal.Body>{props.message}</Modal.Body>
  <Modal.Footer>
  <Button variant="secondary" onClick={toggleShow}>
      Close
  </Button>
  <Button variant="primary" onClick={toggleShow}>
      Save Changes
  </Button>
  </Modal.Footer>
</Modal>
         </>
     )
 }