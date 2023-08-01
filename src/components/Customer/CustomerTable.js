import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';
import MuiPagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import api from "../http-common/http-common";
import TokenContext from '../Token/Token';
import { isString, isStringInValid } from '../../utils/utils'

const columns = [
  { field: 'name', headerName: 'Наименование', width: 130 },
];

/*
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}*/

export default function CustomerTable(textToSearchFor) {
  const token = useContext(TokenContext);

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
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
    if (!currentPage) setCurrentPage(0);
    if (isString(textToSearchFor) && !isStringInValid(textToSearchFor,1)) {
     return `/customers?title=${textToSearchFor}&page=${currentPage}&size=10`;
    } else {
      return `/customers?page=${currentPage}&size=10`;
    }
  }, [textToSearchFor, currentPage]);

  const rows = [
    { id: 1, name: 'Нет доступа к данным о клиентах', phone: '...', email:"..." },
  ];

  const fetchData = useCallback(async () => {
    return api(getTitleUrl(), 'GET', token)
    .then(data => {
      setData(data.customers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    })
    .catch((error) => {
      setData(rows);
    }
    )

  }, [getTitleUrl,token]);

  useEffect(() => {
    console.log(`useEffect `);
    fetchData();
  }, [fetchData]);

  function onPaginationModelChange () {
    console.log(`onPaginationModelChange `);
    if (currentPage === 0) {
      console.log(`nextPage would be = ${currentPage+1}`);
      setCurrentPage(1);
      setPaginationModel({page:{currentPage},pageSize:10});
    }
    
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <DataGrid rows={data} columns={columns} 
        rowCount={rowCountState}
        gridPageCountSelector
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={onPaginationModelChange}
        />
      </Stack>
    </Box>
  );
}
