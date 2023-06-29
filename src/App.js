import React, { useEffect, useState } from "react"

const App = () => {
  const [users, setUsers] = useState([])

  let headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa("user:ad50c8e9-14cf-4c7e-87d0-f02331192c37"));
  
  console.log(headers);

  const fetchUserData = () => {
    fetch("http://localhost:4232/api/customers", { method:'GET', headers: headers })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }
  
  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return (
    <div>
      Test sdfsdf dfghf hgdf
    </div>
  );
}

export default App;