import ClientsList from "../components/ClientsList";
import ExpensesList from "../components/ExpensesList";
import MainHeader from "../components/MainHeader"
import NotificationDetails from "../components/NotificationDetails";
import OcularList from "../components/OcularList";
import ProductsList from "../components/ProductsList";
import QuotationList from "../components/QuotationList";
import RecordExpensesForm from "../components/RecordExpensesForm";
import SalesList from "../components/SalesList";
import Sidebar from "../components/Sidebar";
import '../index.css';

const Notifications = () => {
    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <NotificationDetails/>
            </div>
        </>

    );
};

export default Notifications;
