import React from 'react'
import CustomerModal from "./CustomerModal";
//import { PersonAdd } from '@material-ui/icons';

// deconstructed props
function CustomerEdit(props) {
    const { customer, handleShowCustomerModal, deleteEmployee, handleNewOrder, show, setShow, 
        handleChangeCustomer, handleSubmitCustomer, listOrder} = props;
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
                  onClick={() => deleteEmployee(customer.id)}
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
                  onClick={() => listOrder(customer.id)}
                >
                  Список заказов
                </button>
              </td>
        </tr>
  )
}

export default CustomerEdit;