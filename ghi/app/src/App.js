import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import NewShoeForm from './NewShoeForm';
import './index.css'
import HatForm from './NewHatForm';
import HatList from './HatList';

import React, {useEffect, useState } from 'react';

function App() {

const [shoeList, setShoeList] = useState([])
const[hat, setHat] = useState([])
const[location, setLocation] = useState([])

const fetchData = async () => {
  const response = await fetch('http://localhost:8080/api/shoes/');
  if (response.ok) {
    const data = await response.json();
    console.log(data.shoes)
    setShoeList(data.shoes)
  }
}

async function getHat() {
  const response = await fetch('http://localhost:8090/api/hats/');
  if(response.ok) {
    const data = await response.json();
    setHat(hat);
  } else(
    console.error('An error occurred fetching the data')
  )
}

async function getLocation(){
  const url = 'http://localhost:8100/api/locations/';
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    setLocation(data.location);
  }
}

useEffect(() => {
  getLocation();
  fetchData();
  getHat();
}, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />}/>
            <Route path="/shoes" index element={<ShoesList shoes={shoeList} party={"hello"}/>} />
            <Route path="shoes/new" element={<NewShoeForm />} />
            <Route path="hats">
              <Route index element={<HatList hat={hat}/>} />
              <Route path ="new" element={<HatForm location={location}/>} />
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App
