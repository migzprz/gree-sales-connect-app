import InvoiceDetails from "../components/InvoiceDetails";
import MainHeader from "../components/MainHeader"
import QuotationForm from "../components/QuotationForm";
import ReportOptions from "../components/ReportOptions";
import SetOcularForm from "../components/SetOcularForm";
import Sidebar from "../components/Sidebar";
import '../index.css';
import { Link } from 'react-router-dom';

const GenerateInvoice = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <InvoiceDetails/>
            </div>
        </>

    );
};

export default GenerateInvoice;
