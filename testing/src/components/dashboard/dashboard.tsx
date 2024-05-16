import HeaderDashboard from './headerDashboard/headerDashboard';
import AddItems from './items/add-items';
import ItemsPage from './items/get-items';
import Sidebar from './sidebar/sidebar';
import styles from './dashboard.module.css'; 
import AddVariantPage from './variants/add-variants';

const DashboardComponent: React.FC = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <HeaderDashboard />
                <AddItems />
                <ItemsPage />
                <AddVariantPage/>
            </div>
        </div>
    );
};

export default DashboardComponent;
