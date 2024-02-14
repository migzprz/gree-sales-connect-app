import MainHeader from "../components/MainHeader"
import SaleDetails from "../components/SaleDetails";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewSaleDetails = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <SaleDetails/>
            </div>
        </>

    );
};

export default ViewSaleDetails;
