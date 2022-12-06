import React from "react"
import {createPortal} from "react-dom"
import "./Modal.scss"
import {CSSTransition} from "react-transition-group"


const Modal = (props) => {
    const {style, onClose, className, inProp, bg, ...attributes} = props

    return createPortal(
        <CSSTransition unmountOnExit in={inProp} timeout={1000} classNames="my-modal">

            <div className={["modal", className ? className : ""].join(" ")} {...attributes}>
                {props.children}
            </div>
        </CSSTransition>,
        document.getElementById("modal-root") as HTMLDivElement
    )
}


export default Modal
