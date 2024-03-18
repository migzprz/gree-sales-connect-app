import MainHeader from "../components/MainHeader"
import SalesReport from "../components/Reports/SalesReport";
import QuotationConversionReport from "../components/Reports/QuotationConversionReport";
import ReportOptions from "../components/ReportOptions";
import Sidebar from "../components/Sidebar";
import '../index.css';

const GenerateReport = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <QuotationConversionReport/>
            </div>
        </>

    );
};

export default GenerateReport;
