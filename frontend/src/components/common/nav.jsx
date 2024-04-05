import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { ACCESS_TOKEN } from '../../constants';

export default function Nav() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const response = await api.get('/api/user/');
          if (response.status === 200) {
            setUser(response?.data[0]);
          } 
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
    console.log('Hi, welcome!');
  }, []);


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link to={user ? '/dashboard' : '/'} className="navbar-brand" >ADRA: Automatic Diabetic Retinopathy Assessment</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                  user ? (
                    <>
                      <li className="nav-item">
                        <Link to={'#'} className="nav-link" aria-current="page" href="#">Welcome, {user?.first_name} {user?.last_name.substring(0, 1)}.</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/patients'} className="nav-link" aria-current="page" href="#">Patients</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/logout'} className="nav-link" aria-current="page">Logout</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        {/* <a className="nav-link active" aria-current="page" href="#">Login</a> */}
                        <Link to={'/login'} className="nav-link" aria-current="page" href="#">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/register'} className="nav-link" aria-current="page">Register</Link>
                      </li>
                    </>
                  )
                  
                }
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}
