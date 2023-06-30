import { useEffect, useState } from "react";
import api from "./http-common";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerCrud from "./components/CustomerCrud";

function App() {
  const [publishers, setCustomers] = useState([]);

  /* manage side effects */
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await api.get("/customers");
    setCustomers(result.data);
  }

  return (
    <div>
      <h1 className="text-center">Клиенты</h1>
      <CustomerCrud load={load} customers={publishers} />
    </div>
  );
}

export default App;