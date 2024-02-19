import { useState } from 'react';
import './App.css';
import dashboardImage from './assets/images/about1.png';
import { Outlet, Link } from 'react-router-dom';
import Nav from './components/common/nav';
import { Footer } from './components/misc/Footer';

function App() {
  // login
  // register
  // main dashboard
  // dashboard after login
  // add, list, delete, update patients
  // register, update profile doctors
  // prediction dashboard - assign to patient details, save result

  return (
    <>
      <Nav />
      
      {/* main body */}
      <div className='container-fluid wrapper'>
        <div className='row'>
          <div className="col-sm-8 left-dashboard">
              <img src={dashboardImage} alt="dashboard-about" className='dashboard-image'/>
            </div>
            <div className="col-sm-4 right-dashboard">
              <span className='lead'>Caring for better life</span>
              <h1 className='dashboard-text'>Leading the way in medical excellence.</h1>
              <Link to={'dashboard'}>
                <button className='dashboard-btn'>
                  Diagnose Now
                </button>
              </Link>
            </div>
          </div>
          <Footer />
      </div>

      {/* <Link to={'contacts/1'}>Go To Link</Link> */}

      <Outlet />
    </>
  );
}

export default App;
