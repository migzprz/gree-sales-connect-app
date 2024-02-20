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
import ViewSaleDetails from './pages/ViewSaleDetails';
import ViewClients from './pages/ViewClients';
import ViewClientDetails from './pages/ViewClientDetails';
import ViewProducts from './pages/ViewProducts';
import ViewUsers from './pages/ViewUsers';

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
                  <Route path="/viewsaledetails" element={<ViewSaleDetails/>}/>    
                  <Route path="/viewclients" element={<ViewClients/>}/>
                  <Route path="/viewclientdetails" element={<ViewClientDetails/>}/>
                  <Route path="/viewproducts" element={<ViewProducts/>}/>
                  <Route path="/viewusers" element={<ViewUsers/>}/>
              </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
