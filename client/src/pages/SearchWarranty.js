import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import SearchWarrantyForm from "../components/SearchWarrantyForm";
import Sidebar from "../components/Sidebar";
import UsersList from "../components/UsersList";
import '../index.css';

const SearchWarranty = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <SearchWarrantyForm/>
            </div>
        </>

    );
};

export default SearchWarranty;
