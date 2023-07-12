import React from "react";
import CustomerEdit from "./CustomerEdit";

const CustomerList = ({ customers, ...props }) => {
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
          {...props}
          />         
      ))}
      </tbody>
    </table>
  );
};

export default CustomerList;