import InvoiceDetails from "../components/InvoiceDetails";
import MainHeader from "../components/MainHeader"
import ClientSelection from "../components/QuotationComponents/ClientSelection";
import SaleConvertDetails from "../components/SaleConvertDetails";
import SetOcularForm from "../components/SetOcularForm";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ConvertToSale = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <SaleConvertDetails/>
            </div>
        </>

    );
};

export default ConvertToSale;
