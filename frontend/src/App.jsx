// import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from './components/auth/Registration';
import Login from './components/auth/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/system/Home';
import NotFound from './components/system/NotFound';
import DetectDiseaseDashboard from './components/disease_detection/DetectDiseaseDashboard';
import DetectDisease from './components/disease_detection/DetectDisease';
import Patients from './components/disease_detection/Patients';
import CreatePatient from './components/disease_detection/CreatePatients';

function Logout() {
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
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
            <ProtectedRoute>
              <DetectDiseaseDashboard />
            </ProtectedRoute>
        }
        />
        <Route 
          path='/detect-disease'
          element={
            <ProtectedRoute>
              <DetectDisease />
            </ProtectedRoute>
        }
        />
        <Route 
          path='/patients'
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
        }
        />
        <Route 
          path='/create-patient'
          element={
            <ProtectedRoute>
              <CreatePatient />
            </ProtectedRoute>
        }
        />
        <Route 
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
