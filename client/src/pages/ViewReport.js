import MainHeader from "../components/MainHeader"
import SalesReport from "../components/Reports/SalesReport";
import Sidebar from "../components/Sidebar";
import { useParams  } from 'react-router-dom';
import '../index.css';

const ViewReport = () => {
    const { type } = useParams();

    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                {type === '1' ?
                <SalesReport/>
                : null}
            </div>
        </>

    );
};

export default ViewReport;
