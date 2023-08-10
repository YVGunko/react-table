import { useState, useCallback } from 'react';

export default function useOrder() {
    const fetchData = useCallback(async () => {
    setLoading(true);
    return api(getTitleUrl(), 'GET', token)
    .then(data => {
      setRows(data.customers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setLoading(false);
    })
    .catch((error) => {
      console.log(`CustomerGrid fetchData ${JSON.stringify(error)}`);
      setRows(fakeRows);
      setLoading(false);
      })

  }, [getTitleUrl,token]);
}