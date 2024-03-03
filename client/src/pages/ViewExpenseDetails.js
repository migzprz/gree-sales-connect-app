import ClientsList from "../components/ClientsList";
import ExpenseDetails from "../components/ExpenseDetails";
import ExpensesList from "../components/ExpensesList";
import MainHeader from "../components/MainHeader"
import OcularList from "../components/OcularList";
import ProductsList from "../components/ProductsList";
import QuotationList from "../components/QuotationList";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const ViewExpenseDetails = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <ExpenseDetails/>
            </div>
        </>

    );
};

export default ViewExpenseDetails;
