import React from 'react';

const Slats = (props) => {
    const {productDetail} = props

    function renderDetailSpecifications(specifications: any[]) {

        return (
            <div className="-mt-3">
                {specifications.map(section => (
                    <div className="mt-5">
                        <label className="text-md font-medium">{section.label}</label>
                        <div>
                            {section.props && Object.keys(section.props).map(prop => (
                                <div className="mt-2 each_spec flex align-start ">
                                    <label className="text-sm sub_label w-[100px] min-w-[100px] font-normal">{prop}</label>
                                    <p className="">{section.props[prop]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    console.log(productDetail)

    return (
        <div>
            <h1 className="mt-5 sec_label font-normal text-base min-w-[150px]">Product Description</h1>
            <div className="sec !mt-0">
                {productDetail.specifications && renderDetailSpecifications(productDetail.specifications)}
            </div>
        </div>
    );
};

export default Slats;