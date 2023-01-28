import React, {Suspense} from 'react';
import DashboardSidebar from "pages/Dashboard/DashboardSidebar/DashboardSidebar";
import {Outlet, Route, Routes} from "react-router-dom"
import Loader from "components/Loader/Loader";

const Dashboard = () => {
    return (
        <div className="container-1400 flex">

            <DashboardSidebar/>

            <div className="content pr-4 lg:pr-auto pl-4">
                <Suspense fallback={<div className="pt-20"><Loader size={50} title="Please wait..." /></div>}>
                    <Outlet/>
                </Suspense>
            </div>
        </div>

    );
};

export default Dashboard;