import React from 'react';
import httpService from '../../utils/http-service';

function RegisterComponent() {
  function handleSubmit(event) {
    event.preventDefault();
    const password = event.target.elements.password.value;
    const username = event.target.elements.username.value;

    httpService
      .postJSON('api/auth/register', { username, password })
      .then((response) => {
        return window.location.replace('http://localhost:3000/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h2>Register</h2>
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
          <button type="submit">Register</button>
        </fieldset>
      </form>
      <a href="localhost:3000/login">Login</a>
    </>
  );
}

export default RegisterComponent;
