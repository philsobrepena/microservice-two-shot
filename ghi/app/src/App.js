import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import NewShoeForm from './NewShoeForm';
import React, {useEffect, useState } from 'react';

function App(props) {

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/shoes/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="shoes" index element={<ShoesList shoes={props.shoes} />} />
            <Route path="shoes/new" element={<NewShoeForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
