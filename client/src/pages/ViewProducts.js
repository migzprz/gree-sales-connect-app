import ClientsList from "../components/ClientsList";
import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import ProductsList from "../components/ProductsList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewProducts = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <ProductsList/>
            </div>
        </>

    );
};

export default ViewProducts;
