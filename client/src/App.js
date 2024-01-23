import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewOculars from './pages/ViewOculars';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <>
    <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login/>} />
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/viewoculars" element={<ViewOculars/>}/> 
              </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
