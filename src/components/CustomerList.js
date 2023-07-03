import React from "react";
import CustomerEdit from "./CustomerEdit";

const CustomerList = ({ customers, editEmployee, deleteEmployee, newOrder, listOrder }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Телефон</th>
          <th scope="col">Опции</th>
        </tr>
      </thead>
      <tbody>
      {customers.map(customer => (
          <CustomerEdit 
          key={customer.id} 
          customer={customer}
          editEmployee={editEmployee}
          deleteEmployee={deleteEmployee}
          newOrder={newOrder}
          listOrder={listOrder}
          />         
      ))}
      </tbody>
    </table>
  );
};

export default CustomerList;