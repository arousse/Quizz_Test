import React from 'react';
import httpService from '../../utils/http-service';

function LoginComponent() {
  function handleSubmit(event) {
    event.preventDefault();
    const password = event.target.elements.password.value;
    const username = event.target.elements.username.value;

    httpService
      .getJSON('api/auth/login', { username, password })
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('userData', Date.now());
          return response.json();
        }
      })
      .then((data) => {
        sessionStorage.setItem('userid', data.id);
        window.location.replace('http://localhost:3000/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="username">
            Username
            <input type="text" id="username" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>
        </fieldset>
        <fieldset>
          <button type="submit">Senden</button>
        </fieldset>
      </form>
      <a href="http://localhost:3000/register">Registrieren</a>
    </>
  );
}

export default LoginComponent;
