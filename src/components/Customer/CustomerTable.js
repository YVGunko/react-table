import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import api from "../http-common/http-common";
import TokenContext from '../Token/Token';
import { isString, isStringInValid } from '../../utils/utils'

const columns = [
  { field: 'name', headerName: 'Наименование', width: 130 },
];


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
}

export default function CustomerTable(textToSearchFor) {
  const token = useContext(TokenContext);

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

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

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <DataGrid rows={data} columns={columns} 
        rowCount={totalItems}
        pageCount={totalPages}
        pagination
        slots={{
          pagination: CustomPagination,
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}/>
      </Stack>
    </Box>
  );
}
