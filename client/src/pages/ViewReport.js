import MainHeader from "../components/MainHeader"
import SalesReport from "../components/Reports/SalesReport";
import Sidebar from "../components/Sidebar";
import { useParams  } from 'react-router-dom';
import '../index.css';
import DetailedSalesReport from "../components/Reports/DetailedSalesReport";
import QuotationConversionReport from "../components/Reports/QuotationConversionReport";
import WarrantyClaimsReport from "../components/Reports/WarrantyClaimsReport";

const ViewReport = () => {
    const { type } = useParams();

    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                {type === '1' ?
                <SalesReport/>
                :type === '2' ?
                <DetailedSalesReport/>
                :type === '3' ?
                <QuotationConversionReport/>
                :type === '4' ?
                <WarrantyClaimsReport/>
                :null}
            </div>
        </>

    );
};

export default ViewReport;
