import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">ADRA: Automatic Diabetic Retinopathy Assessment</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <a className="nav-link active" aria-current="page" href="#">Login</a> */}
                  <Link to={'/login'} className="nav-link" aria-current="page" href="#">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/register'} className="nav-link" aria-current="page">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}
