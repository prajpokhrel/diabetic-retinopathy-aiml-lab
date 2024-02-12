import React, { useState, useEffect } from 'react';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const inputChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUserLogin = (event) => {
    event.preventDefault();
    console.log('Login Details', formData);
  };

  return (
    <>
    
      <div>
        <h1>Login</h1>

        <form action="#">
          <input onChange={inputChangeHandler} type="text" name='email' placeholder='Enter your email' />
          <input onChange={inputChangeHandler} type="password" name='password' placeholder='Enter your password' />
          <button onClick={handleUserLogin}>Login</button>
        </form>

      </div>

    </>
  );
};

export default Login;