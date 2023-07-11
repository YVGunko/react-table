import { useEffect, useState, useCallback, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonAdd } from 'react-icons/fa';
import api from "../http-common";
import CustomerList from "./CustomerList";
import CustomerModal from "./CustomerModal";


const CustomerCrud = () => {
/* state definition  */
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
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textToSearchFor, setTextToSearchFor] = useState("");
  const [page, setPage] = useState(0);

  const [customer, setCustomer ] = useState({
    name: '',
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
    const result = await api.get(getTitleUrl());
    setTotalItems(result.data.totalItems);
    setTotalPages(result.data.totalPages);
    setCurrentPage(result.data.currentPage);
    //setPage(result.data.currentPage);
    setCustomers(result.data.customers);

  }, [getTitleUrl]);

  /* manage side effects */
  useEffect(() => {
    //setPage(1);
    console.log(`fetchData page=${page}`);
    fetchData();
  }, [fetchData]);

  async function load(textToSearchFor, page) {
    const result = await api.get( getTitleUrl (textToSearchFor, page) );
    setCustomers(result.data);
    console.log(`load page=${page}`);
  }

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
    await api.post("/customers/orders/" + id);

  }
  /* newOrder end */

  async function deleteEmployee(id) {
    await api.delete("/delete/" + id);
    alert("Publisher Details Deleted Successfully");
    load();
  }



  async function listOrder(id) {
    await api.get("/customers/orders/" + id);
    alert("listOrder");
    load();
  }

  async function update(event) {
    event.preventDefault();
    if (!id) return alert("Publisher Details No Found");
    await api.put("/update", {
      id: id,
      name: name,
      email: email,
      phone: phone,
    });
    alert("Publisher Details Updated");
    // reset state
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    load();
  }

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

    event.preventDefault();
  }

  async function handleSubmitCustomer ( event ) {
    console.log("SUBMITTED! ", customer);

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
           console.log(`handleSubmitCustomer: id=${customer.id}, name=${customer.name}, phone=${customer.phone}`);
   })
   .catch((error) => {
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
/*
const callCustomerModal = () => {
  return ({


    <CustomerModal 
      show={showCustomerModal} 
      setShow={setShowCustomerModal} 
      handleChangeCustomer={handleChangeCustomer}
      handleSubmitCustomer={handleSubmitCustomer}
      handleNewOrder={handleNewOrder}
      header="Новый клиент" 
      />});
}*/
  /* end handlers */

/* jsx */
  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <label>Поиск по наименованию</label>
          <input
            type="text"
            className="form-control"
            value={textToSearchFor}
            //onChange={e => setToSearchFor(e.target.value)}
            onChange={textToSearchForChange}
          />
        </div>

        <div>
          <button disabled={page === 0} className="btn btn-primary m-4" value={-1} onClick={nextPage}>
          {page}
          </button>
          <button disabled={page === parseInt(totalPages-1, 10)} className="btn btn-primary m-4" value={1} onClick={nextPage}>
          {totalPages}
          </button>
          <button className="btn btn-warning m-4" onClick={handleShowCustomerModal}>
            Добавить клиента
          </button>{


          <CustomerModal 
            show={showCustomerModal} 
            setShow={setShowCustomerModal} 
            handleChangeCustomer={handleChangeCustomer}
            handleSubmitCustomer={handleSubmitCustomer}
            handleNewOrder={handleNewOrder}
            header="Новый клиент" 
            />}
          
        </div>
      </form>
      <CustomerList
        customers={customers}
          editEmployee={handleShowCustomerModal}
          deleteEmployee={deleteEmployee}
          handleNewOrder={handleNewOrder}
          show={showCustomerModal} 
          setShow={setShowCustomerModal} 
          handleChangeCustomer={handleChangeCustomer}
          handleSubmitCustomer={handleSubmitCustomer}
          listOrder={listOrder}
      />
    </div>
  );
};

export default CustomerCrud;