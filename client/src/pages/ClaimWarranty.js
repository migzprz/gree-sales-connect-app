import ClaimWarrantyForm from "../components/ClaimWarrantyForm";
import MainHeader from "../components/MainHeader"
import Sidebar from "../components/Sidebar";
import WarrantyDetails from "../components/WarrantyDetails";
import '../index.css';

const ClaimWarranty= () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <ClaimWarrantyForm/>
            </div>
        </>

    );
};

export default ClaimWarranty;
