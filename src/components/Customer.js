import React from 'react'

function Customer({customer, customer:{id, name, email, phone}, captureEdit, changeEditState}) {

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button
                  onClick={() => {
                    captureEdit(customer);
                    changeEditState(customer)
                  }}
                >
                  Edit
                </button>
            </td>
        </tr>
    )
}
export default Customer