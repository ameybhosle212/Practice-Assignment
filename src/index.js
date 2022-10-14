import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';
import Verify from './component/Verify';
import ProtectedRoute from './component/ProtectedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectedRoute children={App} />} ></Route>
      <Route path='/register' element={<Register />} ></Route>
      <Route path='/login' element={<Login />}  ></Route>
      <Route path='/verify/:token' element={<Verify />}  ></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
