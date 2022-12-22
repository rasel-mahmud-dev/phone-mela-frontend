import React from 'react';

const Slats = (props) => {
    const {productDetail, detail} = props

    function renderDetailSpecifications(detail: {}) {
        return (
            <div className="mt-3">
                {Object.keys(detail).map(key => (
                    <div className="mt-4 border-b pb-4">
                        <h4 className="font-medium">{key}</h4>
                        {detail?.[key] && detail?.[key].map(item => (
                            <div className="mt-3">

                                <div className="flex items-start gap-x-4 ">{Object.keys(item).map(itemKey => (
                                    <>
                                        <p className="font-normal text-dark-500 w-[200px]">{itemKey}</p>
                                        <h4 className="font-normal text-dark-900">{item[itemKey]}</h4>
                                    </>
                                ))}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="mt-20">
            <h1 className="mt-5 sec_label font-semibold text-2xl min-w-[150px] min-w-[150px]">Product Description</h1>
            <div className="mt-4">
                {detail && detail.detail && renderDetailSpecifications(detail.detail)}
            </div>
        </div>
    );
};

export default Slats;