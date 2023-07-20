import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import NewShoeForm from './NewShoeForm';

function App(props) {
    if (props.shoes === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Route path="shoes">
          <Route index element={<ShoesList shoes={props.shoes} />} />
          <Route path="new" element={<NewShoeForm />} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
