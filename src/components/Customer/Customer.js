import React from 'react'
import CustomerModal from "./CustomerModal";
import { api } from "../http-common/http-common";
//import { PersonAdd } from '@material-ui/icons';

async function listOrder(id) {
  await api.get("/customers/orders/" + id);
}

async function deleteCustomer(id) {
  await api.delete("/customers/delete/" + id);
}

// deconstructed props
function Customer(props) {
    const { customer, handleShowCustomerModal, handleNewOrder, show, setShow, 
        handleChangeCustomer, handleSubmitCustomer} = props;
  return (
        <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
{/*            <button className="btn btn-warning m-4" onClick={handleShowCustomerModal}>
             Редактировать
            </button>{
                <CustomerModal 
                    show={show} 
                    setShow={setShow} 
                    handleChangeCustomer={handleChangeCustomer}
                    handleSubmitCustomer={handleSubmitCustomer}
                    handleNewOrder={handleNewOrder}
                    header="Редактировать клиента" 
            />}*/}
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => handleNewOrder(customer.id)}
                >
                  Создать заказ
                </button>
                <button
                  type="button"
                  className="btn btn-info mx-2"
                  onClick={() => listOrder(customer)}
                >
                  Заказы клиента
                </button>
              </td>
        </tr>
  )
}

export default Customer;