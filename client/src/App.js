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
import ViewWarranties from './pages/ViewWarranties';
import SearchWarranty from './pages/SearchWarranty';
import DownloadQuotation from './pages/DownloadQuotation';
import ViewWarrantyDetails from './pages/ViewWarrantyDetails';
import ClaimWarranty from './pages/ClaimWarranty';
import ViewExpenses from './pages/ViewExpenses';
import ViewExpenseDetails from './pages/ViewExpenseDetails';
import RecordExpenses from './pages/RecordExpenses';

function App() {
  return (
    <>
          <BrowserRouter>
              <Routes>

                  {/* General Pages */}
                  <Route path="/" element={<Login/>} />
                  <Route path="/home" element={<Home/>}/>

                  {/* Sales Module */}
                  <Route path="/viewoculars" element={<ViewOculars/>}/> 
                  <Route path="/setocular" element={<SetOcular/>}/> 
                  <Route path="/generatequotation" element={<GenerateQuotation/>}/> 
                  <Route path="/viewquotations" element={<ViewQuotations/>}/> 
                  <Route path="/generateinvoice" element={<GenerateInvoice/>}/> 
                  <Route path="/converttosale" element={<ConvertToSale/>}/> 
                  <Route path="/viewsales" element={<ViewSales/>}/> 
                  <Route path="/viewsaledetails" element={<ViewSaleDetails/>}/>    
                  <Route path="/viewclients" element={<ViewClients/>}/>
                  <Route path="/viewclientdetails/:id" element={<ViewClientDetails/>}/>
                  <Route path="/downloadquotation" element={<DownloadQuotation/>}/>

                  {/* Aftersales Module */}
                  <Route path="/viewwarranties" element={<ViewWarranties/>}/>
                  <Route path="/viewwarrantydetails" element={<ViewWarrantyDetails/>}/>
                  <Route path="/searchwarranty" element={<SearchWarranty/>}/>
                  <Route path="/claimwarranty" element={<ClaimWarranty/>}/>

                  {/* Executive Module */}
                  <Route path="/report" element={<GenerateReport/>}/> 
                  <Route path="/viewexpenses" element={<ViewExpenses/>}/>
                  <Route path="/viewexpensedetails" element={<ViewExpenseDetails/>}/>
                  <Route path="/recordexpenses" element={<RecordExpenses/>}/>

                  {/* SysAd Module */}
                  <Route path="/viewproducts" element={<ViewProducts/>}/>
                  <Route path="/viewusers" element={<ViewUsers/>}/>

                  
                  

              </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
