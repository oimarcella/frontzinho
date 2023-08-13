import { Toast } from "react-bootstrap";
import { ToastStyled } from "./styles";
import { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { selectToast, close } from "../../../../redux/toastSlice";

type MyToastT = {
    isOpen: boolean;
    type?: string;
    message: string;
    delay?: number;
}

const MyToast = () => {
    const toast: MyToastT = useSelector(selectToast);
    const dispatch = useDispatch();

    function closeToast() {
        dispatch(close());
    }

    return (
        <ToastStyled
            className="d-inline-block m-1"
            bg={toast.type}
            onClose={() => closeToast()} show={toast.isOpen} delay={toast.delay} autohide>
            <Toast.Body className='text-white'>
                {toast.message}
            </Toast.Body>
        </ToastStyled>
    )
}

export default MyToast;