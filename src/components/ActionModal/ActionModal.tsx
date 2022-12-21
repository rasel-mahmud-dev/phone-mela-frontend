import React, {FC, ReactNode} from "react";
import Modal from "UI/Modal/Modal";

interface Props {
    onClose?: () => void;
    children: ReactNode;
    isOpen: boolean
}

const ActionModal: FC<Props> = ({children, isOpen, onClose}) => {


    return (
        <Modal backdropClass="bg-dark-900/60" onClose={onClose}
               className={`!top-1/3 max-w-sm`} isOpen={isOpen}>
            {children}
        </Modal>
    );
};

export default ActionModal;
