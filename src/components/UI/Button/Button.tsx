import React, {FC, HTMLAttributes} from "react";
import "./style.scss"

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {
    loading?: boolean | { delay?: number };
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    type?: "button" | "submit"
    disabled?: boolean
    children?: React.ReactNode;
}


const Button: FC<BaseButtonProps> = (props) => {
    const {
        loading, type, className, disabled,
        ...attributes
    } = props

    return (
        <button
            type={type}
            className={`px-4 py-2 font-semibold rounded-md ${disabled ? "btn-disable" : ""} ${className}`}
            {...attributes}>
            {loading && <LoadingIcon/>}
            {props.children && <span className={[(loading) ? 'ml-2' : ''].join(' ')}>{props.children}</span>}
        </button>
    )
}


const LoadingIcon = () => {
    return (
        <div className="loading-circle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Button