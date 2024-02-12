import React, { useSyncExternalStore } from 'react';
import { useState, useEffect } from 'react';

const Registration = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    medicalCouncilNumber: '',
  });

  const inputChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUserRegistration = (event) => {
    event.preventDefault();
    console.log('Registration Details', formData);
  };

  useEffect(() => {
    // use effect
  }, []);

  return (
    <>
      <h1>Registration</h1>

      <form action="#">
        <input onChange={inputChangeHandler} name='firstName' type="text" placeholder='Enter your First Name'/>
        <input onChange={inputChangeHandler} name='lastName' type="text" placeholder='Enter your Last Name'/>
        <input onChange={inputChangeHandler} name='email' type="text" placeholder='Enter your email' />
        <input onChange={inputChangeHandler} name='password' placeholder='Enter your password' type="text" />
        <input onChange={inputChangeHandler} name='confirmPassword' placeholder='Enter your confirm password' type="text" />
        <input onChange={inputChangeHandler} name='phoneNumber' type="text" placeholder='Enter your Phone Number'/>
        <input onChange={inputChangeHandler} name='medicalCouncilNumber' type="text" placeholder='Enter your Medical Council Number'/>
        <button onClick={handleUserRegistration}>Register</button>
      </form>
    </>
  );
}

export default Registration;