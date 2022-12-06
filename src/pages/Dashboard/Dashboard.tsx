import React from 'react';
import SideBar from "pages/Customer/Dashboard/SideBar";
import {Outlet, Route, Routes} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";
import {toggleSideBar} from "actions/toolsAction";


const Dashboard = () => {

    const contentRef = React.useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()

    const {tools: {openSideBar}} = useSelector((state: RootStateType) => state)

    const [navigationHeight, setNavigationHeight] = React.useState(0)

    function clickOnOverlay() {
        dispatch(toggleSideBar({
            where: "customer_dashboard",
            isOpen: false
        }))
    }

    function handleResize() {
        // let navigation = document.querySelector(".navigation") as HTMLDivElement
        // let footer = document.querySelector(".footer") as HTMLDivElement
        // setNavigationHeight(navigation.clientHeight + footer.clientHeight)
        // let s = (footer ? footer.offsetHeight : 0) + (navigation ? navigation.offsetHeight: 0 )
        // console.log(s)
        // contentRef.current.style.minHeight = `calc(100vh - ${s}px)`
    }

    React.useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="container-1400 flex">
            <div className="left_sidebar">
                <div className="left_sidebar_content">
                    <SideBar/>
                </div>
            </div>

            <div className="content ml-5">
                <Outlet/>
            </div>
        </div>

    );
};

export default Dashboard;