import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewOculars from './pages/ViewOculars';
import Home from './pages/Home';
import Login from './pages/Login';
import SetOcular from './pages/SetOcular';

function App() {
  return (
    <>
    <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login/>} />
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/viewoculars" element={<ViewOculars/>}/> 
                  <Route path="/setocular" element={<SetOcular/>}/> 
              </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
