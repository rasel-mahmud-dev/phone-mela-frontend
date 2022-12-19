import React from 'react';
import {useSelector} from 'react-redux';
import {RootStateType} from "store/index";
import {ToolsReducerType} from "reducers/toolsReducer";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";

interface Props {
    toggleSideBar: (args: any) => void
    tools: ToolsReducerType
}

const AdminDashboardHome = (props) => {

    function clickOnOverlay() {
        props.toggleSideBar({
            where: "customer_dashboard",
            isOpen: false
        })
    }


    const {tools: {isOpenSideBar}} = useSelector((state: RootStateType) => state)

    function calculateCosts() {
        return "3242342TK"
    }

    return (
        <div className="p-4">
            <WithSidebarButton>
                <h1 className="text-3xl font-medium">Admin Dashboard</h1>
            </WithSidebarButton>

            <div className="flex mt-4 flex-wrap flex-col sm:flex-row">
                <div className="border border-primary-400 rounded flex-1 py-6 bg-white ">
                    <h1 className="text-primary-400 text-xl text-center font-medium">SALES</h1>
                    <h4 className="text-sm text-center font-medium mt-2">200 items</h4>
                </div>

                <div className="border border-primary-400 bg-white rounded flex-1 py-6 sm:ml-10 ml-0 mt-4 sm:mt-0">
                    <h1 className="text-primary-400 text-xl text-center font-medium">TOTAL EARN</h1>
                    <h4 className="text-sm text-center font-medium mt-2">TK. {calculateCosts()}</h4>
                </div>

            </div>

            <div className="mt-5">
                <h2 className="text-xl font-medium mt-5">Sales</h2>
            </div>

            <div className="mt-5">
                <h2 className="text-xl font-medium mt-5">Orders</h2>
            </div>

        </div>
    );

}

export default AdminDashboardHome
