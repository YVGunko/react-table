import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import { DataGrid } from '@mui/x-data-grid';

import api from "../http-common/http-common";
import TokenContext from '../Token/Token';
import isStringInValid from '../../utils/utils'

const columns = [
  { field: 'name', headerName: 'Наименование', width: 130 },
];

export default function CustomerTable(textToSearchFor) {
  const token = useContext(TokenContext);

  const [customers, setCustomers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const getTitleUrl = useCallback(() => {
    if (!currentPage)
    console.log(`getTitleUrl, /customers?title=${textToSearchFor}&page=${currentPage}&size=10`);
    if (textToSearchFor & isStringInValid(textToSearchFor,1)) {
      console.log(`getTitleUrl, /customers?title=${textToSearchFor}&page=${currentPage}&size=10`);
      return `/customers?title=${textToSearchFor}&page=${currentPage}&size=10`;
    } else {
      console.log(`getTitleUrl, /customers?page=${currentPage}&size=10`);
      return `/customers?page=${currentPage}&size=10`;
    }
  }, [textToSearchFor, currentPage]);

  const fetchData = useCallback(async () => {
    console.log(`fetchData Url=${getTitleUrl()}`);
    return api(getTitleUrl(), 'GET', token)
    .then(data => {
      setCustomers(data.customers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    })
    .catch(
      setCustomers(data.customers);
    )

  }, [getTitleUrl,token]);

  useEffect(() => {
    console.log(`useEffect `);
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={customers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: {currentPage}, pageSize: 10 },
          },
        }}pageSizeOptions={[10]}
      />
    </div>
  );
}
