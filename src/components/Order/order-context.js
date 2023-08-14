import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { DataGrid, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { CustomerContext } from '../Customer/CustomerCrud';
import useOrder from './useOrder'

const OrderContext = React.createContext();
const OrderProvider = (props) => {
    const orderInformation = {
        id: "",
        comment: "",
        details: "details",
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
    };
    const fetchedOrdersData = {
        rows: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,

        setValues: (fetchedData) => {
            console.log(`setValues ${JSON.stringify(fetchedData)}`);
            setFetchedData({rows:fetchedData?.orders ? fetchedData.orders : [], 
                totalItems:fetchedData?.totalItems ? fetchedData.totalItems : 0});
        }
    }
    const [fetchedData, setFetchedData] = useState(fetchedOrdersData);
    const [orderInfo, setOrderInfo] = useState(orderInformation);
    return (
      <OrderContext.Provider value={{orderInfo, fetchedData}}>
        {props.children}
      </OrderContext.Provider>
    );
  };

  const Orders = ({selectedCustomer, ...props}) => {
    const context = useContext(OrderContext);

    return (
        <div className="user">
        <h1 className="profile-userName">{selectedCustomer?.id}</h1>
        <p className="profile-fullName">({context.orderInfo.details})</p>
        <p className="profile-fullName">({context.fetchedData?.orders})</p>
        <OrdersTopBox />
        <OrdersGridBox />
      </div>
      
    );
  };

  const OrdersTopBox = (props) => {
    const context = useContext(OrderContext);
    return (
      <div className="user">
        <h1 className="profile-userName">{context.orderInfo?.id}</h1>
        <p className="profile-fullName">({context.fetchedData?.totalItems})</p>
        <p className="profile-fullName">({context.fetchedData?.orders})</p>
      </div>
    );
  };
  const OrdersGridBox = (props) => {
    const context = useContext(OrderContext);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10, });
    function onPaginationModelChange (paginationModelL) {
        console.log(`onPaginationModelChange ${JSON.stringify(paginationModelL)}`);
        setPaginationModel({page:paginationModelL.page, pageSize: paginationModelL.pageSize});
      }

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const onRowsSelectionHandler = useMemo(() =>(ids) => {
        const selectedRowsData = ids.map((id) => context.fetchedData.rows.find((row) => row.id === id));
        console.log(`onRowsSelectionHandler ${selectedRowsData}`);
        //customerHasChanged(selectedRowsData[0]);
      }, [context.fetchedData.rows]);

    useEffect(() => {
        console.log(`order-context useEffect useOrder.fetchedData`);
        /*const data = useOrder.fetchedData;
        if (!data) { data = useOrder.fakeData; }*/
        context.fetchedData.setValues(useOrder.fetchedData ? useOrder.fetchedData : useOrder.fakeData);
    }, [useOrder.fetchedData]);

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <DataGrid rows={ context.fetchedData.rows}  columns={ context.orderInfo?.columnsForDataGrid } 
            rowCount={ context.fetchedData?.totalItems }
            gridPageCountSelector
            pageSizeOptions={[10]}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={ onPaginationModelChange }
    
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={ (ids) => onRowsSelectionHandler (ids) }
            keepNonExistentRowsSelected
    
            autoHeight={true}
            loading={loading}
            />
          </Stack>
        </Box>
      );
    }
const OrderBox = () => {
    const {selectedCustomer} = useContext(CustomerContext);
    
    const data = useOrder().fetchedData ;
    console.log(`OrderBox  useOrder().fetchedData ${JSON.stringify(data)}`);
    return (        
        <OrderProvider fetchedData={data}>
            <Orders selectedCustomer={selectedCustomer}/>
        </OrderProvider>
    )
};

/**
 * 
 */

export default OrderBox;