import React from 'react';
import Skeleton from "UI/Skeleton/Skeleton";

const ProductDetailsSkeleton = () => {
    return (
        <Skeleton className="block md:grid grid-cols-12 gap-8">
            <div className="card col-span-4 p-4">
                <Skeleton.Line className="h-72 w-full "/>
                <div className="flex gap-x-4 mt-6">
                    <Skeleton.Line className="h-10 w-full"/>
                    <Skeleton.Line className="h-10 w-full"/>
                </div>

                <div className="mt-8">
                    <Skeleton.Line className="h-6 w-32"/>
                    {new Array(10).fill(0).map((_, i) => (
                        <Skeleton.Line className="h-2 w-11/12 mt-2" key={i}/>
                    ))}
                </div>


            </div>

            <div className="card col-span-8 p-4">
                <div>
                    <Skeleton.Line className="h-8 w-11/12 "/>
                    <Skeleton.Line className="h-6 w-20 mt-2 "/>
                    <Skeleton.Line className="h-6 w-20 mt-2 "/>
                </div>

                <div className="mt-8">
                    <Skeleton.Line className="h-6 w-40"/>
                    {new Array(10).fill(0).map((_, i) => (
                        <Skeleton.Line className="h-2 w-6/12 mt-2" key={i}/>
                    ))}
                </div>


                <div className="mt-8">
                    <Skeleton.Line className="h-6 w-40"/>
                    {new Array(10).fill(0).map((_, i) => (
                        <Skeleton.Line className="h-2 w-full mt-2" key={i}/>
                    ))}
                </div>
            </div>
        </Skeleton>
    );
};

export default ProductDetailsSkeleton;