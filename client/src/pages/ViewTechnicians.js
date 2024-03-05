import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import TechniciansList from "../components/TechniciansList";
import UsersList from "../components/UsersList";
import '../index.css';

const ViewTechnicians = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <TechniciansList/>
            </div>
        </>

    );
};

export default ViewTechnicians;
