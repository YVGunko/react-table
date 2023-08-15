import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { DataGrid, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import useOrder from './useOrder'

export const  OrderContext = React.createContext();
  const columnsForDataGrid = [
    {
        field: 'sample',
        headerName: 'Образцы',
        type: 'boolean',
        width: 100,
        headerClassName: 'super-app-theme--header',
        editable: false,
        renderCell: (params) => {
          return params.value ? (
            <CheckIcon
              style={{
                color: 'primary.main',
              }}
            />
          ) : (
            <CloseIcon
              style={{
                color: 'super-app-theme--header',
              }}
            />
          );
        },
      },
        { field: 'id', type: 'string', headerName: '№ заказа', headerAlign: 'center', width: 100, headerClassName: 'super-app-theme--header', },
        { field: 'date', type: 'Date', headerName: 'Дата', headerAlign: 'center', width: 120, headerClassName: 'super-app-theme--header', },
        { field: 'division_name', headerName: 'Подразделение', headerAlign: 'center', width: 120, headerClassName: 'super-app-theme--header', },
        { field: 'details', headerName: 'Содежание...', headerAlign: 'center', width: 240, headerClassName: 'super-app-theme--header', },
        {
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            width: 180,
            sortable: false,
            disableClickEventBubbling: true,
            
            renderCell: (params) => {
                const onClick = (e) => {
                  const currentRow = params.row;
                  return alert(JSON.stringify(currentRow, null, 4));
                };
                
                return (
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
                    <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
                  </Stack>
                );
            },
          },
          {
            field: "fiction",
            headerName: "fiction",
            sortable: false,
            renderCell: ({ row }) =>
              <Button onClick={() => yourActionFunction(row)}>
                Action
              </Button>,
          },
    ];

    function yourActionFunction (row) {
        return alert(JSON.stringify(row, null, 4));
    }
  const OrdersTopBox = () => {
    const context = useContext(OrderContext);
    return (
      <div className="user">

      </div>
    );
  };
  const OrdersGridBox = (data) => {

    console.log(`OrdersGridBox ${JSON.stringify(data.data?.currentPage)}`);
    const {paginationModel, setPaginationModel} = useContext(OrderContext);

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    //const [data, setData] = useState([]);
    
    function onPaginationModelChange (paginationModelL) {
        console.log(`onPaginationModelChange ${JSON.stringify(paginationModelL)}`);
        setPaginationModel({page:paginationModelL.page, pageSize: paginationModelL.pageSize});
      }

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const onRowsSelectionHandler = useMemo(() =>(ids) => {
        const selectedRowsData = ids.map((id) => data.data.orders.find((row) => row.id === id));
        console.log(`onRowsSelectionHandler ${selectedRowsData}`);
        //customerHasChanged(selectedRowsData[0]);
      }, [data.data.orders]);

    return (
        <Box sx={{ height: '100%', width: '100%' ,
        '& .super-app-theme--header': {
          backgroundColor: 'primary.light',
        },

        }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <DataGrid rows={ data.data?.orders ? data.data?.orders : []}  columns={ columnsForDataGrid } 
            rowCount={ data.data?.totalItems ? data.data?.totalItems : 0 }
            gridPageCountSelector
            pageSizeOptions={[5]}
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
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 5, });
    const data = useOrder(paginationModel).fetchedData ;
    if (data) { console.log(`OrderBox  useOrder().fetchedData currentPage ${JSON.stringify(data.currentPage)}`); }
    return (       
        <OrderContext.Provider value = { { paginationModel, setPaginationModel } }> 
            <OrdersTopBox />
            {data && (<OrdersGridBox data={data}/>)}
        </OrderContext.Provider >
    )
};

/**
 * 
 */

export default OrderBox;