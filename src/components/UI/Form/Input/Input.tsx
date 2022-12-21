import { useMemo } from "react";
import validator from "../../../../utils/validator";


const Input = (props) => {
    const {
        label,
        onChange,
        placeholder,
        name,
        inputClass="",
        validate,
        type = "text",
        className,
        value,
        disabled = false,
        defaultValue,
        error,
        labelIcon,
        options = null,
    } = props;

    // const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e) {
        const target = e.target;
        // console.log(validate, target.value)
        let result = validator(validate, target.value);
        onChange && onChange(e, result);
    }

    return useMemo(() => {
        return (
            <div className={`my-4 ${disabled ? "custom-input-group-disabled": ""}  `}>
                {label && (
                    <label htmlFor={name} className="flex items-center  gap-x-1">
                        {labelIcon}
                        {label}
                    </label>
                )}
                <div className={`border py-1.5 rounded-md ${error ? "error" : ""}`}>
                    { type === "textarea" ? (
                        <textarea
                            onChange={handleChange}
                            name={name}
                            id={name}
                            value={value}
                            className={`outline-none border-none bg-transparent w-full px-2 ${inputClass} `}
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            onChange={handleChange}
                            type={type}
                            name={name}
                            value={value}
                            id={name}
                            disabled={disabled}
                            className={`outline-none border-none bg-transparent w-full px-2 ${inputClass} `}
                            placeholder={placeholder}
                        />
                    )}
                </div>
                <span className="text-red-500 font-medium text-xs">{error ? error : ""}</span>
            </div>
        );
    }, [error, defaultValue, options, value]);
};

export default Input;
