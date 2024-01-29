import MainHeader from "../components/MainHeader"
import SetOcularForm from "../components/SetOcularForm";
import Sidebar from "../components/Sidebar";
import '../index.css';

const SetOcular = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <SetOcularForm/>
            </div>
        </>

    );
};

export default SetOcular;
