import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import api from "../http-common/http-common";
import TokenContext from '../Token/Token';
import { isString, isStringInValid } from '../../utils/utils'

const columns = [
  { id: 'name', label: 'Наименование', minWidth: 270 },
];

export default function CustomerTable(textToSearchFor) {
  const token = useContext(TokenContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    console.log(`handleChangePage ${event.target.value}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(`handleChangeRowsPerPage ${event.target.value}`);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rows, setRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  const getTitleUrl = useCallback(() => {
    if (!currentPage) setCurrentPage(0);
    if (isString(textToSearchFor) && !isStringInValid(textToSearchFor,1)) {
     return `/customers?title=${textToSearchFor}&page=${currentPage}&size=${rowsPerPage}`;
    } else {
      return `/customers?page=${currentPage}&size=${rowsPerPage}`;
    }
  }, [textToSearchFor, currentPage, rowsPerPage]);

  const fakeRows = [
    { id: 1, name: 'Нет доступа к данным о клиентах', phone: '...', email:"..." },
  ];

  const fetchData = useCallback(async () => {
    return api(getTitleUrl(), 'GET', token)
    .then(data => {
      setRows(data.customers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    })
    .catch((error) => {
      setRows(fakeRows);
    }
    )

  }, [getTitleUrl,token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
