import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import QuotationList from "../components/QuotationList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewQuotations = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <QuotationList/>
            </div>
        </>

    );
};

export default ViewQuotations;
