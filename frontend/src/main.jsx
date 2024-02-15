import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './error/error_page.jsx';
import Registration from './components/auth/Registration.jsx';
import './index.css';

// react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import { DetectDisease } from './components/disease_detection/DetectDisease.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "detect-disease",
      //   element: <DetectDisease />
      // },
      {
        path: "contacts/:contactID",
        element: <div>Hello Contact</div>
      },
      // {
      //   path: "registration",
      //   element: <Registration />
      // }
    ]
  },
  {
    path: "detect-disease",
    element: <DetectDisease />
  },
  {
    path: "registration",
    element: <Registration />
  },
  {
    path: "login",
    element: <Login />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider  router={router} />
  </React.StrictMode>,
);
