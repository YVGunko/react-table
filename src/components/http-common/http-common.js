import { baseURL } from "./baseURL";
// General api to acces data from web
export default async function api(path,method,credentials,params){

  console.log(`http-common api path= ${path}`);

  let options;
      options = Object.assign({headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": 'Basic ' + btoa(credentials.username+':'+credentials.password)
      }},{ method: method }, params ? { body: JSON.stringify(params) } : null );


      const NO_RESPONSE_CODE = 0;

      return await fetch(baseURL+path, options)
          .then(resp => {
            if (resp.ok) {
              console.log(`http-common api to acces data from web responced Ok= ${resp?.status}`);
              return resp.json();
            } else {
              console.log(`http-common api to access data from web responced with code= ${resp?.status}`);
              if (resp.status === NO_RESPONSE_CODE) {
                // server unavailable
                return Promise.reject(new Error('Server unavailable'));
              } else {
                // handle other API errors here, implementation
                // depends on your response format
                return Promise.reject(new Error(resp?.status));
              }
            }
          })
          .then( json => json)
          .catch((error) => {
            console.log(`http-common api to acces data from web error= ${error?.message}`);
            let err = {
              error : true,
              status : error?.message
            }
            return err;
          });
} 