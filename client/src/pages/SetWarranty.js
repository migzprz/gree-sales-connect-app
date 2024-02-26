import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import UsersList from "../components/UsersList";
import '../index.css';

const SetWarranty = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <UsersList/>
            </div>
        </>

    );
};

export default SetWarranty;
