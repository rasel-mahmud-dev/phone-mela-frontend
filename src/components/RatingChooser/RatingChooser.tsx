import React, {useEffect, useState} from "react";

import {BsStarFill} from "react-icons/all.js";

const RatingChooser = ({name, defaultValue, label, onChange, inputClass = "", total}) => {
    const [state, setState] = useState({
        value: "",
        errorMessage: "",
    });

    useEffect(() => {
        setState({
            value: defaultValue,
            errorMessage: "",
        });
    }, [defaultValue]);

    function handleChangeRate(rate) {

        setState((p) => ({
            ...p,
            // errorMessage: validate,
            value: rate
        }));

        onChange({target: {name, value: rate}});
    }

    return (
        <div className="flex flex-col mt-4">
            {label && (
                <label className="cursor-pointer  text-dark-500" htmlFor={name}>
                    {label}
                </label>
            )}
            <div
                className="border border-dark-10/50 px-3 hover:border-green-600 focus:border-green-600 rounded-md py-2.5 outline-none flex gap-x-1"
            >
                {Array(total).fill(1).map((_, index) => (
                    <BsStarFill key={index} onClick={() => handleChangeRate(index + 1)}
                                className={`text-dark-50/50 cursor-pointer ${state.value >= index + 1 ? "!text-orange-400" : ""} `}

                    />
                ))}
            </div>

            {state.errorMessage && <div className="text-red-400 text-sm mt-1">{state.errorMessage}</div>}
        </div>
    );
};
;

export default RatingChooser;