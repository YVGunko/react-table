import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import {
  DataGrid,
} from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import api from "../http-common/http-common";
import TokenContext from '../Token/Token';
import { isString, isStringInValid } from '../../utils/utils'

const columns = [
  { field: 'name', headerName: 'Наименование', width: 230 },
];

export default function CustomerTable(textToSearchFor) {
  const token = useContext(TokenContext);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const [rowCountState, setRowCountState] = React.useState(
    totalItems || 0,
  );
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
    totalItems !== undefined
        ? totalItems
        : prevRowCountState,
    );
  }, [totalItems, setRowCountState]);

  const getTitleUrl = useCallback(() => {
    if (isString(textToSearchFor) && !isStringInValid(textToSearchFor,1)) {
     return `/customers?title=${textToSearchFor}&page=${paginationModel.page}&size=${paginationModel.pageSize}`;
    } else {
      return `/customers?page=${paginationModel.page}&size=${paginationModel.pageSize}`;
    }
  }, [textToSearchFor, paginationModel]);

  const fakeRows = [
    { id: 1, name: 'Нет доступа к данным о клиентах', phone: '...', email:"..." },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    return api(getTitleUrl(), 'GET', token)
    .then(data => {
      setData(data.customers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setLoading(false);
    })
    .catch((error) => {
      console.log(`CustomerGrid fetchData ${JSON.stringify(error)}`);
      setData(fakeRows);
      setLoading(false);
    }
    )

  }, [getTitleUrl,token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function onPaginationModelChange (paginationModelL) {
    console.log(`onPaginationModelChange ${JSON.stringify(paginationModelL)}`);
    setPaginationModel({page:paginationModelL.page, pageSize: paginationModelL.pageSize});
  }
  function onRowSelectionModelChange (onRowSelectionModelChangeL) {
    console.log(`onRowSelectionModelChange ${JSON.stringify(onRowSelectionModelChangeL)}`);
    setRowSelectionModel(onRowSelectionModelChangeL);
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <DataGrid rows={data} columns={columns} 
        rowCount={rowCountState}
        gridPageCountSelector
        pageSizeOptions={[10, 25]}
        
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={ onPaginationModelChange }

        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={ onRowSelectionModelChange }
        keepNonExistentRowsSelected

        autoHeight={true}
        loading={loading}
        />
      </Stack>
    </Box>
  );
}
