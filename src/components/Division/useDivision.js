import { useState, useCallback, useContext, useEffect } from 'react';

import  api  from "../http-common/http-common";
import TokenContext from '../Token/Token';
const divisionURL = `/divisions`;

export default function useDivision( ) {
    const token = useContext(TokenContext);

    const [fetchedData, setFetchedData] = useState();

    const fetchData = useCallback(async () => {
        console.log(`useDivision()  fetchData `);
    return api(`${divisionURL}`, 'GET', token)
    .then(fetchedData => {
        setFetchedData(fetchedData);
    })
    .catch((error) => {
      console.log(`useDivision()  fetchData ${JSON.stringify(error)}`);
      return(error);
      })

  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
    
  return {
    fetchedData,
  }
}