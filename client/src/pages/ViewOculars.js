import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewOculars = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <OcularList/>
            </div>
        </>

    );
};

export default ViewOculars;
