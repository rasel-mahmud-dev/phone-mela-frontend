import React from 'react';
import CustomerDashboardHome from "pages/Dashboard/Customer/CustomerDashboardHome";
import {useSelector} from "react-redux";
import {RootStateType} from "store/index";
import AdminDashboard from "pages/Dashboard/Admin/AdminDashboardHome";

const DashboardHome = () => {
    const {auth} = useSelector((state: RootStateType) => state.auth)

    return auth && (
        <div>

            {auth.role === "ADMIN" ? (
                <AdminDashboard/>
            ) : (
                <CustomerDashboardHome/>

            )}

        </div>
    );
};

export default DashboardHome;