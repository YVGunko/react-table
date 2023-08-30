import React, { useContext, useState, useMemo} from 'react';
import { createPortal } from 'react-dom';
import { DataGrid, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import IconButton from '@mui/material/IconButton';

import useOrder from './useOrder';
import {CustomerContext} from '../Customer/CustomerCrud';
import OrderDialog from './OrderDialog';
import { ModalButton } from './Modal';
import { isObjectEmpty } from "../../utils/utils";
import CustomerDialog from "../Customer/CustomerDialog";

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
          ) : <></>
          
        },
      },
        { field: 'id', type: 'string', headerName: '№ заказа', headerAlign: 'center', width: 100, headerClassName: 'super-app-theme--header', },
        { field: 'date', type: 'Date', headerName: 'Дата', headerAlign: 'center', width: 120, headerClassName: 'super-app-theme--header', },
        { field: 'division_name', headerName: 'Подразделение', headerAlign: 'center', width: 120, headerClassName: 'super-app-theme--header', },
        { field: 'details', headerName: 'Содежание...', headerAlign: 'center', width: 240, headerClassName: 'super-app-theme--header', },
        { field: "edit",
            width: 40,
            headerName: "",
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: ({ row }) => { 
              return (
                <>
                  <ModalButton order = {row}/>
                </>
            );
          },
        },
          { field: "send",
          width: 40,
          headerName: "",
          sortable: false,
          renderCell: ({ row }) =>
            <IconButton onClick={(event) => sendOrderByEmail(event, row)}  variant="outlined" color="primary" size="small">
              <SendOutlinedIcon />
            </IconButton >,
        },

    ];
//TODO
    const handleActionColmunClick = (event) => {
      event.stopPropagation();
      console.log(`order-context handleActionColmunClick `)
    };
    function sendOrderByEmail (event, row) {
        event.stopPropagation();
        return (
          <>
            <ModalButton order = {row}/>
          </>
        )
        //return alert(JSON.stringify(row, null, 4));
    }
    function openOrderDialog (event, row) {
      event.stopPropagation();
      console.log(`order-context openOrderDialog `)
      alert(JSON.stringify(row, null, 4));
      return (
         <>
            {createPortal( <OrderDialog order = { row } extOpen = { true } />, document.body )}
             
         </>
      )
  }

  const OrdersTopBox = () => {
    const {selectedCustomer, selectedOrderData} = useContext(OrderContext);
    const message = `Заказы клиента: ${selectedCustomer ? selectedCustomer.name : "Клиент не выбран"}`;
    console.log(`order-context OrdersTopBox `)
    
    return (
      <div className="user">
      <Stack direction="row" spacing={2}>
        <Item>
          <Typography noWrap>{message}</Typography>
        </Item>
        {!isObjectEmpty (selectedCustomer) && (<OrderDialog />)}
      </Stack>
      </div>
    );
  };
  const OrdersGridBox = (data) => {

    console.log(`OrdersGridBox ${JSON.stringify(data.data?.orders).substring(1,70)}`);
    const {paginationModel, setPaginationModel, 
      selectedOrderData, setSelectedOrderData} = useContext(OrderContext);

    const [loading, setLoading] = useState(false);
   
    function onPaginationModelChange (paginationModelL) {
        console.log(`onPaginationModelChange ${JSON.stringify(paginationModelL)}`);
        
        setPaginationModel({page:paginationModelL.page, pageSize: paginationModelL.pageSize});
      }

/*    React.useEffect(() => {
      setRowCountState((prevRowCountState) =>
      totalItems !== undefined
          ? totalItems
          : prevRowCountState,
      );
    }, [totalItems, setRowCountState]);*/

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const onRowsSelectionHandler = useMemo(() =>(ids) => {
      let selOrderData = ids.map((id) => data.data.orders.find((row) => row.id === id)) ;
      console.log(`rowSelectionModel ${JSON.stringify(selOrderData[0])}`);
      setRowSelectionModel(selOrderData[0]);
      //setSelectedOrderData(selOrderData[0]);
        //customerHasChanged(selectedRowsData[0]);
      }, [ data.data.orders]);

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
    const [selectedOrderData, setSelectedOrderData] = React.useState({});
    console.log(`OrderBox start. ${selectedCustomer.id}, ${paginationModel.page}, ${JSON.stringify(selectedOrderData).substring(1,50)}`);
    const data = useOrder(paginationModel).fetchedData ;
    if (data) { console.log(`OrderBox useOrder().fetchedData currentPage ${JSON.stringify(data.orders).substring(1,50)}`); }
    return (       
        <OrderContext.Provider 
          value = { { paginationModel, setPaginationModel, 
            selectedCustomer, selectedOrderData, setSelectedOrderData } }> 
            <OrdersTopBox />
            {data && (<OrdersGridBox data={data}/>)}
        </OrderContext.Provider >
    )
};

export default OrderBox;