import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import UsersList from "../components/UsersList";
import WarrantiesList from "../components/WarrantiesList";
import WarrantyDetails from "../components/WarrantyDetails";
import '../index.css';

const ViewWarrantyDetails= () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <WarrantyDetails/>
            </div>
        </>

    );
};

export default ViewWarrantyDetails;
