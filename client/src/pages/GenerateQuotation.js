import MainHeader from "../components/MainHeader"
import QuotationForm from "../components/QuotationForm";
import ReportOptions from "../components/ReportOptions";
import Sidebar from "../components/Sidebar";
import '../index.css';

const GenerateQuotation = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <QuotationForm/>
            </div>
        </>

    );
};

export default GenerateQuotation;
