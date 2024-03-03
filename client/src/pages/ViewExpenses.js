import ClientsList from "../components/ClientsList";
import ExpensesList from "../components/ExpensesList";
import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import ProductsList from "../components/ProductsList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewExpenses = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <ExpensesList/>
            </div>
        </>

    );
};

export default ViewExpenses;
