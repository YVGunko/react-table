import React from "react";

const CustomerList = ({ customers, editEmployee, deleteEmployee, newOrder, listOrder }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Телефон</th>

          <th scope="col">Option</th>
        </tr>
      </thead>
      {customers.map((customer, index) => {
        return (
          <tbody key={customer.id}>
            <tr>
              <th scope="row">{index + 1} </th>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editEmployee(customer)}
                >
                  Edit
                </button>
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
                  onClick={() => newOrder(customer.id)}
                >
                  Добавить заказ
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
          </tbody>
        );
      })}
    </table>
  );
};

export default CustomerList;