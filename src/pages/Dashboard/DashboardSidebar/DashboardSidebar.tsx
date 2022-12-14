import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {RootStateType} from "store/index";
import "./styles.scss"


import Menu from "UI/Menu/Menu";
import {toggleSideBar} from "actions/toolsAction";
import Preload from "UI/Preload/Preload";
import {ActionTypes} from "actions/actionTypes";
import fullLink from "../../../utils/fullLink";
import Sidebar from "components/Sidebar/Sidebar";
import Avatar from "components/Avatar/Avatar";
import {logoutAction} from "actions/authAction";
import {CgProductHunt, FaUsers} from "react-icons/all";


const DashboardSidebar = () => {

    const {auth: {auth}, tools: {isOpenSideBar}} = useSelector((state: RootStateType) => state)

    const [activeItem, setActiveItem] = useState(0)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [collapseIds, setCollapseIds] = React.useState(["123"])

    const [isOpenMobileSidebar, setOpenMobileSidebar] = useState(false)


    function toggleCollapseSubMenu(id) {
        if (collapseIds.indexOf(id) !== -1) {
            setCollapseIds([])
        } else {
            setCollapseIds([id])
        }
    }
    function handleLogOut() {
        logoutAction(dispatch, () => {
            navigate("/");
        });
    }
    const sidebarData = {
        CUSTOMER: [
            {
                id: 123,
                name: "Dashboard",
                onClick: closeSidebar,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faHomeAlt}/>*/}
                    </div>
                ),
                to: `/dashboard`
            },
            {
                menu_section_name: "Manage My Account",
                name: "My Account",
                onClick: closeSidebar,
                id: 1,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faUser}/>*/}
                    </div>
                ),
                sub_menu: [
                    {
                        name: "Account Information",
                        onClick: closeSidebar,
                        to: "/dashboard/account-info",
                    },
                    {
                        name: "Address Book",
                        onClick: closeSidebar,
                        to: "/dashboard/address-book"
                    },
                    // {name: "Payment Option", to: "/dashboard/brands"},
                    // {name: "Vouchers", to: "/dashboard/brands"},
                ]
            },
            {
                menu_section_name: "Orders",
                name: "Orders",
                id: 2,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faUser}/>*/}
                    </div>
                ),
                sub_menu: [
                    {
                        name: "My Orders",
                        onClick: closeSidebar,
                        to: "/dashboard/orders",
                        iconRender: () => (
                            <div className="mr-2">
                                {/*<FontAwesomeIcon icon={faShoppingBag}/>*/}
                            </div>
                        ),
                    },
                    {name: "My Returns"},
                    {name: "My Cancellations"},
                ]
            },
            {
                name: "My Transactions",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faCartPlus}/>*/}
                    </div>
                ),
                onClick: closeSidebar,
                to: "/dashboard/transactions",
                id: 34,
                logo: "fa fa-star"
            },
            {
                name: "My Reviews",
                onClick: closeSidebar,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faStar}/>*/}
                    </div>
                ),
                to: "/dashboard/reviews",
                id: 33,
                logo: "fa fa-star"
            },
            {
                name: "My Cart",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faCartPlus}/>*/}
                    </div>
                ),
                onClick: closeSidebar,
                to: "/dashboard/carts",
                id: 34,
                logo: "fa fa-star"
            },
            {
                name: "My Wishlist & Followed Stores",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faHeart}/>*/}
                    </div>
                ),
                onClick: closeSidebar,
                to: "/dashboard/wishlist",
                id: 35,
                logo: "fa fa-star"
            },
            {
                name: "Setting",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faCog}/>*/}
                    </div>
                ),
                onClick: () => {
                },
                id: 3,
                logo: ""
            },
            {
                name: "Policies",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faCog}/>*/}
                    </div>
                ),
                onClick: () => {
                },
                id: 4,
                logo: ""
            },
            {
                name: "Help",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faHandsHelping}/>*/}
                    </div>
                ),
                onClick: () => {
                },
                id: 5,
                logo: ""
            },
            {
                name: "Sign Out",
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faSignOutAlt}/>*/}
                    </div>
                ),
                onClick: handleLogOut,
                id: 6,
                logo: ""
            }
        ],
        ADMIN: [
            {
                id: 213123,
                name: "Dashboard",
                onClick: closeSidebar,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faHomeAlt}/>*/}
                    </div>
                ),
                to: `/admin/dashboard`
            },
            {
                id: 213122343,
                name: "Sales",
                onClick: closeSidebar,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faHomeAlt}/>*/}
                    </div>
                ),
                to: `/admin/sales`
            },
            {
                menu_section_name: "Products",
                name: "My Products",
                id: 1,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faUser}/>*/}
                    </div>
                ),
                sub_menu: [
                    {
                        name: "Products",
                        onClick: closeSidebar,
                        to: "/admin/products",
                    },
                    {
                        name: "Add Products",
                        onClick: closeSidebar,
                        to: "/admin/product/add-product"
                    },
                    // {name: "Payment Option", to: "/dashboard/brands"},
                    // {name: "Vouchers", to: "/dashboard/brands"},
                ]
            },
            {
                id: 2131275,
                name: "Brands",
                onClick: closeSidebar,
                iconRender: () => (
                    <div className="mr-2">
                        {/*<FontAwesomeIcon icon={faHomeAlt}/>*/}
                    </div>
                ),
                to: `/admin/brands`
            },
            {
                menu_section_name: "Customer",
                name: "Customer",
                id: 1,
                to: `/admin/customers`,
                iconRender: () => (
                    <div className="mr-2"><FaUsers /></div>
                )
            },
            {
                menu_section_name: "Orders",
                name: "Orders",
                id: 1,
                to: `/admin/orders`,
                iconRender: () => (
                    <div className="mr-2"><CgProductHunt /> </div>
                )
            },
        ]
    }

    function renderSidebarItem(items) {
        return items && items.map(data => (
            <div>
                <Menu selectedKeys={collapseIds}>
                    {data?.sub_menu ? (
                        <Menu.SubMenu onClick={toggleCollapseSubMenu}
                                      key={data.id.toString()}
                                      title={<>
                                          <div className="flex">
                                              {data.iconRender && data.iconRender()}
                                              <span>{data.name}</span>
                                          </div>
                                      </>}
                        >
                            {data.sub_menu && data.sub_menu.map(s => (
                                <Menu.Item key={s.name}>
                                    <div className="flex">
                                        {s.iconRender && s.iconRender()}
                                        {s.to ? (
                                            <Preload onClick={s.onClick && s.onClick} to={s.to}>{s.name}</Preload>
                                        ) : (
                                            <div onClick={s.onClick && s.onClick}>{s.name}</div>
                                        )}
                                    </div>
                                </Menu.Item>
                            ))}

                        </Menu.SubMenu>

                    ) : (
                        <Menu.Item icon={data?.logo} key={data.id.toString()}>
                            {data?.to ? (
                                <Preload onClick={data.onClick && data.onClick} to={data.to}>
                                    <div className="flex" onClick={data.onClick}>
                                        {data.iconRender && data.iconRender()}
                                        {data.name}
                                    </div>
                                </Preload>
                            ) : (
                                <div onClick={data.onClick && data.onClick} className="flex">
                                    {data.iconRender && data.iconRender()}
                                    {data.name}
                                </div>
                            )}
                        </Menu.Item>
                    )}
                </Menu>
            </div>))
    }

    function closeSidebar() {
        dispatch(toggleSideBar(false))
    }


    return (
        <Sidebar isOpenSidebar={isOpenSideBar} onClose={closeSidebar}>
            <div className="">
                <div className="sidebar-author">
                    <Avatar src={fullLink(auth?.avatar)} className="flex justify-center " imgClass="w-14"/>
                    <h4 className="author-name">{auth?.username}</h4>
                    <p className="author-position">{auth.role}</p>
                </div>

                {Object.keys(sidebarData).map((role: any) => auth.role === role && (
                    renderSidebarItem(sidebarData[role])
                ))}
            </div>
        </Sidebar>
    )
}


export default DashboardSidebar