// import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from './components/auth/Registration';
import Login from './components/auth/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/system/Home';
import NotFound from './components/system/NotFound';
import DetectDiseaseDashboard from './components/disease_detection/DetectDiseaseDashboard';
import DetectDisease from './components/disease_detection/DetectDisease';

function Logout() {
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  // login
  // register
  // main dashboard
  // dashboard after login
  // add, list, delete, update patients
  // register, update profile doctors
  // prediction dashboard - assign to patient details, save result

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element= {<Home />}
        />
        <Route 
          path='/login'
          element={<Login />}
        />
        <Route 
          path='/logout'
          element={<Logout />}
        />
        <Route 
          path='/register'
          element={<RegisterAndLogout />}
        />
        <Route 
          path='/dashboard'
          element={
            // <ProtectedRoute>
              <DetectDiseaseDashboard />
            // </ProtectedRoute>
        }
        />
        <Route 
          path='/detect-disease'
          element={
            // <ProtectedRoute>
              <DetectDisease />
            // </ProtectedRoute>
        }
        />
        <Route 
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
    // <>
    //   <Nav />
      
    //   {/* main body */}
    //   <div className='container-fluid wrapper'>
    //     <div className='row'>
    //       <div className="col-sm-8 left-dashboard">
    //           <img src={dashboardImage} alt="dashboard-about" className='dashboard-image'/>
    //         </div>
    //         <div className="col-sm-4 right-dashboard">
    //           <span className='lead'>Caring for better life</span>
    //           <h1 className='dashboard-text'>Leading the way in medical excellence.</h1>
    //           <Link to={'dashboard'}>
    //             <button className='dashboard-btn'>
    //               Diagnose Now
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //       <Footer />
    //   </div>

    //   {/* <Link to={'contacts/1'}>Go To Link</Link> */}

    //   <Outlet />
    // </>
  );
}

export default App;
