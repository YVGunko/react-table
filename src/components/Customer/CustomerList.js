import React from "react";
import Customer from "./Customer";

const CustomerList = ({ customers, ...props }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  );
};

export default CustomerList;

/*
      {customers.map(customer => (
          <Customer 
          key={customer.id} 
          customer={customer}
          {...props}
          />         
      ))}
*/