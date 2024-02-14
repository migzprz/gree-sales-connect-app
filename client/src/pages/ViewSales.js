import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewSales = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <SalesList/>
            </div>
        </>

    );
};

export default ViewSales;
