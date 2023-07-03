import React, { useEffect, useState } from "react";
import api from "./http-common";
import "bootstrap/dist/css/bootstrap.min.css";
//import CustomerCrud from "./components/CustomerCrud";
import Customers from "./components/Customers";

function App() {
// set state
  const [customers, setCustomers] = useState([]);

  /* manage side effects */
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await api.get("/customers");
    setCustomers(result.data);
  }

// update customers on page after edit
  function onUpdateCustomer(updatedCustomer) {
    const updatedCustomers = customers.map(
      customer => {
        if (customer.id === updatedCustomer.id) {
          return updatedCustomer
        } else {return customer}
      }
    )
    setCustomers(updatedCustomers)
  }

  return (
    <div>
      <Customers
        customers={customers}
        onUpdateCustomer={onUpdateCustomer}
      />
    </div>
  );
}
export default App;