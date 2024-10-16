import CustomFooter from "../../components/CustomFooter/CustomFooter";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomSidebar from "../../components/CustomSidebar/CustomSidebar";
import { Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
    return (
        <div className="grid-container">
            <CustomHeader className="gridheader" />
            <main className="gridmain">
                <Outlet />
            </main>
            <CustomSidebar className="gridsidebar" />
            <CustomFooter className="gridfooter" />
        </div>
    );
}