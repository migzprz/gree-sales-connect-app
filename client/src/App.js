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
import ViewTechnicians from './pages/ViewTechnicians';
import ViewReport from './pages/ViewReport';
import Restriction from './pages/Restriction';
import Error404 from './pages/Error404';

import WithAuth from './withAuth'
import Notifications from './pages/Notifications';

// Sales Routes
const ViewOcularsWithAccess = WithAuth(ViewOculars, 0)
const SetOcularWithAccess = WithAuth(SetOcular, 0)
const GenerateQuotationWithAccess = WithAuth(GenerateQuotation, 0)
const ViewQuotationsWithAccess = WithAuth(ViewQuotations, 0)
const GenerateInvoiceWithAccess = WithAuth(GenerateInvoice, 0)
const ConvertToSaleWithAccess = WithAuth(ConvertToSale, 0);
const ViewSalesWithAccess = WithAuth(ViewSales, 0);
const ViewSaleDetailsWithAccess = WithAuth(ViewSaleDetails, 0);
const ViewClientsWithAccess = WithAuth(ViewClients, 0);
const ViewClientDetailsWithAccess = WithAuth(ViewClientDetails, 0);
const DownloadQuotationWithAccess = WithAuth(DownloadQuotation, 0);

// After-Sales Routes
const ViewWarrantiesWithAccess = WithAuth(ViewWarranties, 1);
const ViewWarrantyDetailsWithAccess = WithAuth(ViewWarrantyDetails, 1);
const SearchWarrantyWithAccess = WithAuth(SearchWarranty, 1);
const ClaimWarrantyWithAccess = WithAuth(ClaimWarranty, 1);

// Executive Routes
const GenerateReportWithAccess = WithAuth(GenerateReport, 2);
const ViewReportWithAccess = WithAuth(ViewReport, 2);
const ViewExpensesWithAccess = WithAuth(ViewExpenses, 2);
const ViewExpenseDetailsWithAccess = WithAuth(ViewExpenseDetails, 2);
const RecordExpensesWithAccess = WithAuth(RecordExpenses, 2);

// SysAd Routes
const ViewProductsWithAccess = WithAuth(ViewProducts, 3);
const ViewUsersWithAccess = WithAuth(ViewUsers, 3);
const ViewTechniciansWithAccess = WithAuth(ViewTechnicians, 3);

// Home Page 
const HomeWithAccess = WithAuth(Home, 999)


function App() {
  return (
    <>
          <BrowserRouter>

                <Routes>

                    {/* General Pages */}
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<HomeWithAccess/>}/>

                    {/* Sales Module */}
                    <Route path="/viewoculars" element={<ViewOcularsWithAccess />}/> 
                    <Route path="/setocular" element={<SetOcularWithAccess/>}/> 
                    <Route path="/generatequotation" element={<GenerateQuotationWithAccess/>}/> 
                    <Route path="/generatequotation/:id" element={<GenerateQuotationWithAccess/>}/> 
                    <Route path="/viewquotations" element={<ViewQuotationsWithAccess/>}/> 
                    <Route path="/generateinvoice" element={<GenerateInvoiceWithAccess/>}/> 
                    <Route path="/converttosale" element={<ConvertToSaleWithAccess />} />
                    <Route path="/viewsales" element={<ViewSalesWithAccess />} />
                    <Route path="/viewsaledetails" element={<ViewSaleDetailsWithAccess />} />
                    <Route path="/viewclients" element={<ViewClientsWithAccess />} />
                    <Route path="/viewclientdetails/:id" element={<ViewClientDetailsWithAccess />} />
                    <Route path="/downloadquotation" element={<DownloadQuotationWithAccess />} />

                    {/* Aftersales Module */}
                    <Route path="/viewwarranties" element={<ViewWarrantiesWithAccess />} />
                    <Route path="/viewwarrantydetails/:id" element={<ViewWarrantyDetailsWithAccess />} />
                    <Route path="/searchwarranty" element={<SearchWarrantyWithAccess />} />
                    <Route path="/claimwarranty/:id" element={<ClaimWarrantyWithAccess />} />

                    {/* Executive Module */}
                    <Route path="/report" element={<GenerateReportWithAccess />} />
                    <Route path="/viewreport/:type/:syear/:smonth/:sday/:eyear/:emonth/:eday" element={<ViewReportWithAccess />} />
                    <Route path="/viewreport/:type/:syear/:smonth/:sday/:eyear/:emonth/:eday/:id/:producttype" element={<ViewReportWithAccess />} />
                    <Route path="/viewexpenses" element={<ViewExpensesWithAccess />} />
                    <Route path="/viewexpensedetails/:id" element={<ViewExpenseDetailsWithAccess />} />
                    <Route path="/recordexpenses" element={<RecordExpensesWithAccess />} />

                    {/* SysAd Module */}
                    <Route path="/viewproducts" element={<ViewProductsWithAccess />} />
                    <Route path="/viewusers" element={<ViewUsersWithAccess />} />
                    <Route path="/viewtechnicians" element={<ViewTechniciansWithAccess />} />

                    {/* Security Pages */}
                    <Route path="/unauthorized" element={<Restriction/>}/>
                    <Route path="/error" element={<Error404/>}/>

                    <Route path="/notifications" element={<Notifications/>}/>

                  </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
