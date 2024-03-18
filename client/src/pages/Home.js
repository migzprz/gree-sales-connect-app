import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import '../index.css';

const Home = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Dashboard/>
            </div>
        </>

    );
};

export default Home;
