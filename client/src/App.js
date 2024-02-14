import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewOculars from './pages/ViewOculars';
import Home from './pages/Home';
import Login from './pages/Login';
import SetOcular from './pages/SetOcular';
import GenerateReport from './pages/GenerateReport';
import GenerateQuotation from './pages/GenerateQuotation';
import ViewQuotations from './pages/ViewQuotations';
import GenerateInvoice from './pages/GenerateInvoice';
import ConvertToSale from './pages/ConvertToSale';
import ViewSales from './pages/ViewSales';

function App() {
  return (
    <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login/>} />
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/viewoculars" element={<ViewOculars/>}/> 
                  <Route path="/setocular" element={<SetOcular/>}/> 
                  <Route path="/report" element={<GenerateReport/>}/> 
                  <Route path="/generatequotation" element={<GenerateQuotation/>}/> 
                  <Route path="/viewquotations" element={<ViewQuotations/>}/> 
                  <Route path="/generateinvoice" element={<GenerateInvoice/>}/> 
                  <Route path="/converttosale" element={<ConvertToSale/>}/> 
                  <Route path="/viewsales" element={<ViewSales/>}/> 
              </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
