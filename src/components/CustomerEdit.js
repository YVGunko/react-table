import React from 'react'

// deconstructed props
function CustomerEdit({customer, editEmployee, deleteEmployee, newOrder, listOrder}) {
  return (
        <tr key={customer.id}>
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
  )
}

export default CustomerEdit;