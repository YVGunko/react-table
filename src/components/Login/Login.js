import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { api } from "../http-common/http-common";
import { baseURLogin } from "../http-common/baseURL";

async function loginUser(credentials) {
    console.log(`loginUser, credentials=${credentials.username}`);
    console.log(`loginUser, body=${JSON.stringify(credentials)}`);
    return fetch(baseURLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Basic ' + btoa(credentials.username+':'+credentials.password)
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

   export default function Login({ setToken }) {
    console.log(`Login, start`);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        id:'0',
        username,
        password
      });
      console.log(`Login, token=${token.id}`);
      setToken(token);
    }
  return(
    <div className="login-wrapper">
      <h1>Войдите чтобы продолжить...</h1>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Имя пользователя</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
            <p>Пароль</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
            <button type="submit">Войти</button>
        </div>
        </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };