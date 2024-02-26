import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import PreviewQuotation from "../components/PreviewQuotation";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import UsersList from "../components/UsersList";
import '../index.css';



const DownloadQuotation = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <PreviewQuotation/>
            </div>
        </>

    );
};

export default DownloadQuotation;
