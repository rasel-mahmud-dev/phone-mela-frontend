import React from "react";
import { BounceLoader } from "react-spinners";

const Loader = ({title="Loading", size=120, className=""}) => {
    return (
        <div className={`flex justify-center flex-col items-center ${className}`}>
            <BounceLoader size={size} color="#647eff" />
            <h1 className="font-bold mt-2">{title}...</h1>
        </div>
    );
};

export default Loader;
