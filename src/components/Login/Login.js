import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import api  from "../http-common/http-common";

/*async function loginUser(credentials) {
    console.log(`loginUser, credentials=${credentials.username}`);
    return fetch(baseURLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Basic ' + btoa(credentials.username+':'+credentials.password)
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }*/

   async function loginUser(credentials) {
    console.log(`loginUser, credentials=${credentials?.password}`);
    return api('/login', 'POST', credentials, credentials);
   }

   export default function Login({ setToken }) {
    console.log(`Login, start`);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState({
      error : false,
      status : ""
    });
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        id:'0',
        username,
        password,
        roles:""
      });

      if (token) {
        console.log(`Login, token?=${token?.error}`);
        if (token.error) {
          console.log(`Login, token.error=${token?.error}`);
          setError({
            error : token?.error,
            status : token?.status
          });
        }else{
          token.password = password;
          console.log(`Login, token=${token?.password}`);
          setToken(token);
        }
      }
    }
    if (error?.error) {
      return(
      <div className="login-wrapper"><h1>Нет доступа к серверу приложения. Попробуйте позже...</h1></div>
      )
    } else {
      return(
        <div className="p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-6 col-lg-3 mx-auto">
              <div className="formContainer">
                <h2 className="p-2 text-center mb-4 h4" id="formHeading">Вход тут...</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <label className="mb-2" htmlFor="username">Имя пользователя </label>
                    <input onChange={e => setUserName(e.target.value)} className="form-control" id="username" name="username" type="text" />
                  </div>
                  <div className="form-group mt-3">
                    <label className="mb-2" htmlFor="password">Пароль</label>
                    <input  onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password" />
                  </div>
                  <button type="submit" className="btn btn-success btn-lg w-100 mt-4">Войти</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>

      )
    }
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };