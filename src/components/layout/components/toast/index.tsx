import { Toast } from "react-bootstrap";
import { ToastStyled } from "./styles";
import { useEffect, useState } from "react";

type MyToastT = {
    type?: string;
    message: string;
    delay?: number;
}

const MyToast = ({ message, delay = 3000, type = "info" }: MyToastT) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        show && setShow(true);
    }, [show]);

    return (
        <ToastStyled
            className="d-inline-block m-1"
            bg={type.toLowerCase()}
            onClose={() => setShow(false)} show={show} delay={delay} autohide>
            <Toast.Body className='text-white'>
                {message}
            </Toast.Body>
        </ToastStyled>
    )
}

export default MyToast;