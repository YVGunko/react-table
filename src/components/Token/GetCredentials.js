//import useToken from '../Token/useToken';
import Login from '../Login/Login';

function setToken(userToken) {
    console.log(`GetCredentials, setToken`);
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }

/*export default function GetCredentials() {
    console.log(`GetCredentials, start`);
    const { token, setToken } = useToken();
    console.log(`GetCredentials, token=${token}`);
    if(!token) {
      return <Login setToken={setToken} />
    } else {
        return token
    }
   }*/
   export default function GetCredentials() {
    console.log(`GetCredentials, start`);
   const token = getToken();

   if(token === undefined) {
    console.log(`GetCredentials, token=${token}`);
     return <Login setToken={setToken} />
   }
   else {
    console.log(`GetCredentials, token=${token}`);
    return token
}
}