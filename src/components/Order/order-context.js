import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { DataGrid, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { CustomerContext } from '../Customer/CustomerCrud';
import useOrder from './useOrder'

const OrderContext = React.createContext();
/*const OrderProvider = (props) => {
    console.log(`OrderProvider ${JSON.stringify(props.value)}`);
    const fetchedOrdersData = {
        columnsForDataGrid : [
            { field: 'id', headerName: '№ заказа', headerAlign: 'center', width: 100 },
            { field: 'division_name', headerName: 'Подразделение', headerAlign: 'center', width: 120,  },
            { field: 'details', headerName: 'Содежание...', headerAlign: 'center', width: 120,  },
        ],

        rows: props.value ? props.value?.orders : [],
        totalItems: props.value ? props.value?.totalItems :0,
        totalPages: 10,
        currentPage: 0,

        setValues: (value) => {
            console.log(`setValues ${JSON.stringify(value)}`);
            setFetchedData({rows:value?.orders ? value.orders : [], 
                totalItems:value?.totalItems ? value.totalItems : 0});
        }
    }
    const [fetchedData, setFetchedData] = useState(fetchedOrdersData);
    return (
      <OrderContext.Provider value={{fetchedData}}>
        {props.children}
      </OrderContext.Provider>
    );
  };*/

  const columnsForDataGrid = [
        { field: 'id', headerName: '№ заказа', headerAlign: 'center', width: 100 },
        { field: 'division_name', headerName: 'Подразделение', headerAlign: 'center', width: 120,  },
        { field: 'details', headerName: 'Содежание...', headerAlign: 'center', width: 240,  },
    ];

  const OrdersTopBox = () => {
    const context = useContext(OrderContext);
    return (
      <div className="user">

      </div>
    );
  };
  const OrdersGridBox = (data) => {

    console.log(`OrdersGridBox ${JSON.stringify(data.data?.orders)}`);
    const context = useContext(OrderContext);

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    //const [data, setData] = useState([]);
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10, });
    function onPaginationModelChange (paginationModelL) {
        console.log(`onPaginationModelChange ${JSON.stringify(paginationModelL)}`);
        setPaginationModel({page:paginationModelL.page, pageSize: paginationModelL.pageSize});
      }

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const onRowsSelectionHandler = useMemo(() =>(ids) => {
        const selectedRowsData = ids.map((id) => data.orders.find((row) => row.id === id));
        console.log(`onRowsSelectionHandler ${selectedRowsData}`);
        //customerHasChanged(selectedRowsData[0]);
      }, [data.orders]);
/*
    useEffect(() => {
        
        
        console.log(`order-context useEffect useOrder.fetchedData ${JSON.stringify(data ? data.orders : [])}`);
        setData(data ? data.orders : []);
        //context.fetchedData.setValues();
    }, [selectedCustomer]);*/

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <DataGrid rows={ data.data?.orders ? data.data?.orders : []}  columns={ columnsForDataGrid } 
            rowCount={ data.data?.totalItems ? data.data?.totalItems : 0 }
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
    //const {selectedCustomer} = useContext(CustomerContext);
    
    const data = useOrder().fetchedData ;
    //console.log(`OrderBox  useOrder().fetchedData ${JSON.stringify(data)}`);
    return (       
        <> 
            <OrdersTopBox />
            <OrdersGridBox data={data}/>
        </>
    )
};

/**
 * 
 */

export default OrderBox;