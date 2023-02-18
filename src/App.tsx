import React from 'react';
import styles from './App.module.css';
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          {/*当页面url不存在时 输出以下页面 */}
          <Route path='*' element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

