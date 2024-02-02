import MainHeader from "../components/MainHeader"
import ReportOptions from "../components/ReportOptions";
import Sidebar from "../components/Sidebar";
import '../index.css';

const GenerateReport = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <ReportOptions/>
            </div>
        </>

    );
};

export default GenerateReport;
