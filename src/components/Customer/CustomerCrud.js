import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import api from "../http-common/http-common";
import CustomerList from "./CustomerList";
import CustomerModal from "./CustomerModal";
import CustomerEditButton from "./CustomerEditButton";
import TokenContext from '../Token/Token';
import { baseURL } from "../http-common/baseURL";
import { encode } from "base-64";

//const api = require("../http-common/http-common");

const CustomerCrud = () => {
/* state definition  */
  const token = useContext(TokenContext);
  const isOrderMaker = token?.roles.toLowerCase().indexOf("order_maker".toLowerCase()) !== -1 ;

  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const handleShowCustomerModal = (e) => {
    if (e.preventDefault) e.preventDefault();
    console.log(`handleShowCustomerModal = ${showCustomerModal}`);
    setShowCustomerModal(showCustomerModal => !showCustomerModal);
  }

  const [customers, setCustomers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [textToSearchFor, setTextToSearchFor] = useState("");
  const [page, setPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [customer, setCustomer ] = useState({
    name: textToSearchFor ? textToSearchFor : '',
    phone: '',
    email: '',
    id: '',
  }, [textToSearchFor]);

  const getTitleUrl = useCallback(() => {
    //if (!!(page)) page = 0;
    if (textToSearchFor) {
      console.log(`getTitleUrl, /customers?title=${textToSearchFor}&page=${page}&size=10`);
      return `/customers?title=${textToSearchFor}&page=${page}&size=10`;
    } else {
      console.log(`getTitleUrl, /customers?page=${page}&size=10`);
      return `/customers?page=${page}&size=10`;
    }
  }, [textToSearchFor, page]);


  function usePrevious(value) {
    console.log(`usePrevious. wanted to print customer.name: ${customer.name} `);
    console.log(`usePrevious ${value} `);
    const ref = useRef();
    useEffect(() => {
      ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
  };
  const prevTextToSearchFor = usePrevious(textToSearchFor);
  //const prevPage = usePrevious(page);
  

  const fetchData = useCallback(async () => {
    console.log(`fetchData ${getTitleUrl()}`);
    
    return fetch(baseURL+getTitleUrl(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Basic ' + encode(token.username+':'+token.password)
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setCustomers(data.customers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    })

  }, [getTitleUrl,token]);

  /* manage side effects */
  useEffect(() => {
    //setPage(1);
    console.log(`fetchData page=${page}`);
    fetchData();
  }, [fetchData]);

  /* beging handlers */
  /* newOrder 
  const handleNewOrder = event => {
    if (event.preventDefault) event.preventDefault();
    console.log('handleNewOrder');
    newOrder();
    //close CustomerModal if open
    //open NewOrderModal
  }*/
  async function handleNewOrder(id) {
    //if (event.preventDefault) event.preventDefault();
    console.log(`newOrder for customer.id=${id}`);
    await api.post("/customers/orders/" + id)
    .then((resp) => {
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
  /* newOrder end */

  const nextPage =(event) => {
    console.log(`nextPage would be = ${page+parseInt(event.target.value, 10)}`);
    setPage(page+parseInt(event.target.value, 10));
    event.preventDefault();
  }
  const textToSearchForChange =(event) => {
    console.log(`event.target.value is set to = ${event.target.value}`);
    setTextToSearchFor(event.target.value);
    console.log(`textToSearchFor is set to = ${textToSearchFor}, prevTextToSearchFor was = ${prevTextToSearchFor}`);

    if (prevTextToSearchFor !== event.target.value) {
      setPage(0);
      console.log(`prevTextToSearchFor !== textToSearchFor -> nextPage would be = ${page}`);
    }

    if (event.preventDefault) event.preventDefault();
  }

  async function handleSubmitCustomer ( event ) {
    console.log("SUBMITTED! ", customer);
    setSubmitting(true);
    if (event.preventDefault) event.preventDefault();
     await api.post("/customers", 
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
const handleChangeCustomer = event => {
  const target = event.currentTarget;
  console.log(`handleChangeCustomer: id=${customer.id}, name=${customer.name}, phone=${customer.phone}`);
  setCustomer({
    ...customer, 
      [target.name]: target.value});
}

const callCustomerModal = () => {
  return (
    <CustomerModal 
      show={showCustomerModal} 
      setShow={setShowCustomerModal} 
      customer={customer} 
      handleChangeCustomer={handleChangeCustomer}
      handleSubmitCustomer={handleSubmitCustomer}
      handleNewOrder={handleNewOrder}
      header="Новый клиент" 
      submitting={submitting}
      />);
}
  /* end handlers */

/* jsx */
  return (
    <>
    <div className="container mt-4">
      <form>
      <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={textToSearchFor}
              onChange={textToSearchForChange}
            />
            <Button variant="outline-primary">
              Поиск
            </Button>
          </Form>
        </Col>
        {isOrderMaker && (<Col sm={4}>
        <Button variant="outline-warning" onClick={callCustomerModal}>
              Создать
            </Button>
        </Col>)}
      </Row>
    </Container>
      </form>
      <CustomerList
        customers={customers}
          editEmployee={handleShowCustomerModal}
          handleNewOrder={handleNewOrder}
          show={showCustomerModal} 
          setShow={setShowCustomerModal} 
          handleChangeCustomer={handleChangeCustomer}
          handleSubmitCustomer={handleSubmitCustomer}
      />
          <form>
    <div>
          <button disabled={page === 0} className="btn btn-primary m-4" value={-1} onClick={nextPage}>
          {page}
          </button>
          <button disabled={page === parseInt(totalPages-1, 10)} className="btn btn-primary m-4" value={1} onClick={nextPage}>
          {totalPages}
          </button>

          <CustomerEditButton caption="New Customer" onClick={handleShowCustomerModal}/>

        </div>
    </form>
    </div>
    </>
  );
};

export default CustomerCrud;