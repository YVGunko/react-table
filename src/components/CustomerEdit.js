import React from 'react';
import api from "../http-common";

// deconstructed props
function CustomerEdit({ editForm, handleCustomerUpdate, handleChange }) {
    let {id, name, email, phone} = editForm

// PATCH request; calls handleCustomerUpdate to push changes to the page
    function handleEditForm(e) {
        e.preventDefault();
        fetch(`http://localhost:4232/api/customers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm),
        })
            .then(resp => resp.json())
            .then(updatedCustomer => {
                handleCustomerUpdate(updatedCustomer)})
    }

    return (
        <div>
            <h4>Edit Customer</h4>
            <form onSubmit={handleEditForm}>
                <input type="text" name="name" value={name} onChange={handleChange}/>
                <input type="text" name="email" value={email} onChange={handleChange}/>
                <input type="text" name="phone" value={phone} onChange={handleChange}/>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
}

export default CustomerEdit;