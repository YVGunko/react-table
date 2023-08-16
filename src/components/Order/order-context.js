import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { DataGrid, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import IconButton from '@mui/material/IconButton';

import useOrder from './useOrder';
import {CustomerContext} from '../Customer/CustomerCrud';

export const  OrderContext = React.createContext();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 200,
    maxWidth: 400,
  }));

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
                color: "primary",
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
        { field: "control",
            headerName: "",
            sortable: false,
            renderCell: ({ row }) =>
              <SendOutlinedIcon onClick={() => yourActionFunction(row)}  variant="outlined" color="primary" size="small">
                Action
              </SendOutlinedIcon>,
          },
    ];

    function yourActionFunction (row) {
        return alert(JSON.stringify(row, null, 4));
    }
  const OrdersTopBox = () => {
    const {selectedCustomer} = useContext(OrderContext);
    const message = `Заказы клиента: ${selectedCustomer ? selectedCustomer.name : "Клиент не выбран"}`;
    const handleClickOpen = () => {

    }
    return (
      <div className="user">
      <Stack direction="row" spacing={2}>
      <Item>
          <Avatar>W</Avatar>
        </Item>
        <Item>
          <Typography noWrap>{message}</Typography>
        </Item>

        <IconButton color="primary" sx={{ p: '10px' }} aria-label="playlistAddCheckOutlinedIcon" onClick={handleClickOpen}>
                <PlaylistAddCheckOutlinedIcon />
        </IconButton>
      </Stack>
      </div>
    );
  };
  const OrdersGridBox = (data) => {

    console.log(`OrdersGridBox ${JSON.stringify(data.data?.currentPage)}`);
    const {paginationModel, setPaginationModel} = useContext(OrderContext);

    const [loading, setLoading] = useState(false);
   
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
    const {selectedCustomer} = useContext(CustomerContext);
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 5, });
    const data = useOrder(paginationModel).fetchedData ;
    if (data) { console.log(`OrderBox  useOrder().fetchedData currentPage ${JSON.stringify(data.currentPage)}`); }
    return (       
        <OrderContext.Provider value = { { paginationModel, setPaginationModel, selectedCustomer } }> 
            <OrdersTopBox />
            {data && (<OrdersGridBox data={data}/>)}
        </OrderContext.Provider >
    )
};

export default OrderBox;