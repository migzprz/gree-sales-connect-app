import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import SalesDashboard from "../components/SalesDashboard";
import Sidebar from "../components/Sidebar";
import '../index.css';

const Home = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <SalesDashboard/>
            </div>
        </>

    );
};

export default Home;
