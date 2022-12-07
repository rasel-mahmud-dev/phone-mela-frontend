import React, {FC, ReactNode, useEffect} from "react";

import "./sidebar.scss";
import Backdrop from "UI/Backdrop/Backdrop";
import useWindowResize from "hooks/useWindowResize";

interface Props {
    children: ReactNode;
    isOpenSidebar: boolean;
    onClose: () => void;
    className?: string;
    header?: () => ReactNode;
}

const Sidebar: FC<Props> = (props) => {
    const {children, isOpenSidebar, onClose, className = "", header} = props;

    let windowSize = useWindowResize()

    useEffect(() => {

        if (windowSize > 1025) {
            onClose && onClose()
        }

    }, [windowSize])


    return (
        <>
            <Backdrop isOpenBackdrop={isOpenSidebar} onClose={onClose} className="bg-dark-800/60 z-40 sidebar-backdrop"/>
            <div className={`sidebar ${className} ${isOpenSidebar ? "sidebar-open" : "sidebar-close"}`}>
                {header && header()}

                <div className="sidebar_content">{children}</div>
            </div>
        </>
    );
};

export default Sidebar;