import { useState } from "react";
import api from "../http-common";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CustomerList from "./CustomerList";

const CustomerCrud = ({ load, customers }) => {
/* state definition  */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
  /* end handlers */

/* jsx */
  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            hidden
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <label>Наименование</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={save}>
            Поиск
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