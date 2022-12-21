import React from 'react';

import {useDispatch} from "react-redux";
import {toggleSideBar} from "actions/toolsAction";
import {FaBars} from "react-icons/all";

const WithSidebarButton = ({className = "", ...props}) => {
    const dispatch = useDispatch()

    return (
        <div {...props} className={`flex items-center select-none my-6 ${className}`}>
            <FaBars
                onClick={() => dispatch(toggleSideBar())}
                className="block lg:hidden text-xl mr-2 cursor-pointer"
            />
            {props.children}
        </div>
    );
};

export default WithSidebarButton;