import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/pro-regular-svg-icons";
import {useDispatch} from "react-redux";
import {toggleSideBar} from "actions/toolsAction";

const WithSidebarButton = ({className = "", ...props}) => {
    const dispatch = useDispatch()

    return (
        <div {...props} className={`flex items-center select-none my-8 ${className}`}>
            <FontAwesomeIcon
                icon={faBars}
                onClick={() => dispatch(toggleSideBar())}
                className="block lg:hidden text-xl mr-2 cursor-pointer"
            />
            {props.children}
        </div>
    );
};

export default WithSidebarButton;