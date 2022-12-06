import React from "react";
import Skeleton from "UI/Skeleton/Skeleton";

const ProductSkeleton = ({ className }) => {
    return (
        <Skeleton className={`w-full ${className}`}>
            <Skeleton.Line className="w-full h-20" />
            <Skeleton.Line className="w-full h-1 mt-2" />
            <Skeleton.Line className="w-full h-1" />
            <Skeleton.Line className="w-full h-1" />
            <Skeleton.Line className="w-full h-1" />
            <Skeleton.Line className="w-full h-1" />
            <Skeleton.Line className="w-full h-1" />
            <div className="flex justify-between items-center gap-x-2 mt-2">
                <Skeleton.Line className="w-full h-6" />
                <Skeleton.Line className="w-full h-6" />
            </div>
        </Skeleton>
    );
};

export default ProductSkeleton

