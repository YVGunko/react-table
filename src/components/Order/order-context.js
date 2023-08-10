import React, { useContext, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";

import { CustomerContext } from '../Customer/CustomerCrud';
import useOrder from './useOrder'

const OrderContext = React.createContext();
const OrderProvider = (props) => {
    const orderInformation = {
        id: "",
        comment: "",
        details: "",
        customer_id: "",
        division_code: "",
        division_name: "",
        user_id: "",
        user_name: "",
        sample: true,
        date: "",

        columnsForDataGrid : [
            { field: 'id', headerName: '№ заказа', headerAlign: 'center', width: 100 },
            { field: 'division_name', headerName: 'Подразделение', headerAlign: 'center', width: 120,  },
            { field: 'details', headerName: 'Содежание...', headerAlign: 'center', width: 120,  },
        ],
        changeNamedProperty: (property, value) => {
            setOrderInfo({ ...orderInfo, [property]: value });
        },
      fetchOrder: (property, value) => {
        setOrderInfo({ ...orderInfo, [property]: value });
        
      },
    };
    /*const customerInformation = {
        id: "",
        name: "",
        email: "",
        phone: "",
    };*/
    const [orderInfo, setOrderInfo] = useState(orderInformation);
    return (
      <OrderContext.Provider value={orderInfo}>
        {props.children}
      </OrderContext.Provider>
    );
  };

  const Orders = (props) => {
    const context = useContext(OrderContext);
    return (
        <div className="user">
        <h1 className="profile-userName">{props.selectedCustomer?.id}</h1>
        <p className="profile-fullName">({context.details})</p>
        <OrdersTopBox />
      </div>
      
    );
  };

  const OrdersTopBox = () => {
    const context = useContext(OrderContext);
    return (
      <div className="user">
        <h1 className="profile-userName">{context?.id}</h1>
        <p className="profile-fullName">({context.details})</p>
      </div>
    );
  };


const OrderBox = () => {
    const {selectedCustomer} = useContext(CustomerContext);

    
      useEffect(() => {
        fetchData();
      }, [fetchData]);
    return (        
        <OrderProvider >
            <Orders selectedCustomer={selectedCustomer}/>
        </OrderProvider>
    )
};

/**
 * 
 */

export default OrderBox;