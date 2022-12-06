import React from "react";
import Skeleton from "UI/Skeleton/Skeleton";

const SidebarSkeleton = ({ className }) => {
    return (
        <Skeleton className={`w-full ${className} white-bg`}  >
            <Skeleton.Line className="w-12 mx-auto h-16" />
            <Skeleton.Line className="w-7/12 mx-auto h-1 mt-1" />
            <Skeleton.Line className="w-10/12 mx-auto h-1" />
            <div className="flex justify-center mt-1">
                <Skeleton.Line className="w-7 h-3" />
            </div>
        </Skeleton>
    );
};

export default SidebarSkeleton;