import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:4232/api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

   export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        id:'0',
        username,
        password
      });
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