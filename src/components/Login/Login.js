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
    console.log(`loginUser, credentials=${credentials.username}`);
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
        password
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
          console.log(`Login, token=${token}`);
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
        <div class="p-4">
        <div class="container">
          <div class="row">
            <div class="col-md-5 col-sm-6 col-lg-3 mx-auto">
              <div class="formContainer">
                <h2 class="p-2 text-center mb-4 h4" id="formHeading">Вход тут...</h2>
                <form onSubmit={handleSubmit}>
                  <div class="form-group mt-3">
                    <label class="mb-2" for="username">Имя пользователя </label>
                    <input onChange={e => setUserName(e.target.value)} class="form-control" id="username" name="username" type="text" />
                  </div>
                  <div class="form-group mt-3">
                    <label class="mb-2" for="password">Пароль</label>
                    <input  onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="password" name="password" />
                  </div>
                  <button type="submit" class="btn btn-success btn-lg w-100 mt-4">Войти</button>
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