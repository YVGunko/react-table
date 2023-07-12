import React from "react";

const OrderList = ({ orders, editOrder, deleteOrder, newOrder }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Nº заказа</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Телефон</th>

          <th scope="col">Option</th>
        </tr>
      </thead>
      {orders.map((order, index) => {
        return (
          <tbody key={order.id}>
            <tr>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customer.name}</td>
                <td>{order.division.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editOrder(order)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteOrder(order.id)}
                >
                  Удалить
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => newOrder(order.id)}
                >
                  Добавить заказ
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default OrderList;