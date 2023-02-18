import React from 'react';
import styles from './App.module.css';
import { HomePage } from './pages';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

