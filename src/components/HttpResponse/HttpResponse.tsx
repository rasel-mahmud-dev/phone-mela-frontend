import React, { FC, ReactNode } from "react";

import Loader from "../Loader/Loader";
import Modal from "UI/Modal/Modal";

interface Props {
    onClose?: () => void;
    loading: boolean;
    message: string;
    loadingTitle: string,
    isSuccess: boolean;
}

const HttpResponse: FC<Props> = ({ loadingTitle, loading, message, isSuccess, onClose }) => {


    return (
        <Modal backdropClass="bg-dark-900/60" isOpen={loading || !!message} onClose={onClose}
               className={`${!isSuccess && "!bg-[#c16a6a]"} !top-1/3 max-w-sm`}>
            {loading && !message ? (
                <div>
                    <p><Loader size={80} title={loadingTitle}/></p>
                </div>
            ): !loading && message &&  (
                <h1 className={`mt-2 font-medium ${isSuccess ? "text-dark-600" : "text-white"} `}>{message}</h1>
            )}
        </Modal>
    );
};

export default HttpResponse;
