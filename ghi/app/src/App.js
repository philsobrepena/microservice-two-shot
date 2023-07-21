import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import NewShoeForm from './NewShoeForm';
import './index.css'

import React, {useEffect, useState } from 'react';

function App() {

const [shoeList, setShoeList] = useState([])

const fetchData = async () => {
  const response = await fetch('http://localhost:8080/api/shoes/');
  if (response.ok) {
    const data = await response.json();
    console.log(data.shoes)
    setShoeList(data.shoes)
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
          <Route path="/" element={<MainPage />}/>
            <Route path="/shoes" index element={<ShoesList shoes={shoeList} party={"hello"}/>} />
            <Route path="shoes/new" element={<NewShoeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
