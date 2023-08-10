import { useState, useContext} from "react";

import TokenContext from '../Token/Token';
import {CustomerContext} from './CustomerCrud';

const OrderGrid = () => {
    const token = useContext(TokenContext);
    const {selectedCustomer} = useContext(CustomerContext);

    const columns = [
        { field: 'id', headerName: '№ заказа', headerAlign: 'center', width: 100 },
        { field: 'division_name', headerName: 'Подразделение', headerAlign: 'center', width: 120,  },
    ];

    return (
        <>
        </>
    )
}
export default  OrderGrid ;