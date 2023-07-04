import { useEffect, useState, useCallback, useRef } from "react";
import api from "../http-common";
import axios from 'axios';
//import { RouteComponentProps, withRouter } from 'react-router-dom';
import CustomerList from "./CustomerList";

const CustomerCrud = () => {
/* state definition  */
  const [customers, setCustomers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textToSearchFor, setToSearchFor] = useState("");
  const [page, setPage] = useState(0);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
  };
  const prevTextToSearchFor = usePrevious(textToSearchFor);

  const fetchData = useCallback(async () => {
    console.log(`fetchData texts : ${prevTextToSearchFor}, ${textToSearchFor}`);
    
    let pageForRequest = 0;
    if (prevTextToSearchFor === textToSearchFor) pageForRequest = page;

    console.log(`fetchData pageForRequest=${pageForRequest}, page= ${page}`);
    const result = await api.get(getTitleUrl (textToSearchFor, pageForRequest) );
    setTotalItems(result.data.totalItems);
    setTotalPages(result.data.totalPages);
    setCurrentPage(result.data.currentPage);
    setPage(result.data.currentPage);
    setCustomers(result.data.customers);
    /*page === 0
      ? setCustomers(result.data.customers)
      : setCustomers(...customers, ...result.data.customers);*/

  }, [textToSearchFor, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTitleUrl = (value, page) => {
    //if (!!(page)) page = 0;
    if (value) {
      console.log(`getTitleUrl, /customers?title=${value}&page=${page}&size=10`);
      return `/customers?title=${value}&page=${page}&size=10`;
    } else {
      console.log(`getTitleUrl, /customers?&page=${page}&size=10`);
      return `/customers?page=${page}&size=10`;
    }
  }

  /* manage side effects */
  /*useEffect(() => {
    (async () => await load(text, page))();
    console.log(`useEffect, text=${text}, page=${page}`);
  }, [text, page]);*/

  async function load(textToSearchFor, page) {
    const result = await api.get( getTitleUrl (textToSearchFor, page) );
    setCustomers(result.data);
    console.log(`load page=${page}`);
  }
  /* beging handlers */
  async function save(event) {
    event.preventDefault();
    await api.post("/create", {
      name: name,
      email: email,
      phone: phone,
    });
    alert("Информация о клиенте сохранена");
    // reset state
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    load();
  }
  async function editEmployee(customers) {
    setName(customers.name);
    setEmail(customers.email);
    setPhone(customers.phone);
    setId(customers.id);
  }

  async function deleteEmployee(id) {
    await api.delete("/delete/" + id);
    alert("Publisher Details Deleted Successfully");
    load();
  }

  async function newOrder(id) {
    await api.post("/newOrder/" + id);
    alert("newOrder");
    load();
  }

  async function listOrder(id) {
    await api.get("/listOrder/" + id);
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
            onChange={e => setToSearchFor(e.target.value)}
          />
        </div>

        <div>
          <button disabled={page === 0} className="btn btn-primary m-4" value={-1} onClick={nextPage}>
            Prev
          </button>
          <button disabled={page === totalPages} className="btn btn-primary m-4" value={1} onClick={nextPage}>
            Next
          </button>
          <button className="btn btn-warning m-4" onClick={update}>
            Update
          </button>
        </div>
      </form>
      <CustomerList
        customers={customers}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
        newOrder={newOrder}
        listOrder={listOrder}
      />
    </div>
  );
};

export default CustomerCrud;