import MainHeader from "../components/MainHeader"
import SalesReport from "../components/Reports/SalesReport";
import Sidebar from "../components/Sidebar";
import { useParams  } from 'react-router-dom';
import '../index.css';
import DetailedSalesReport from "../components/Reports/DetailedSalesReport";

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
                :null}
            </div>
        </>

    );
};

export default ViewReport;
