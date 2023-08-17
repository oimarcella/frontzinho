import { ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { close, selectModal } from '../../../../redux/modalSlice';

type MyModalT = {
    hasHeader?: boolean;
    title?: string;
    hasFooter?: boolean;
    contentFooter?: ReactNode;
    contentBody?: ReactNode;
}

function MyModal(props: MyModalT) {
    const modal = useSelector(selectModal);
    const dispatch = useDispatch();

    function handleClose() {
        dispatch(close());
    }

    return (
        <Modal show={modal.isOpen} onHide={handleClose}>
            <h1>opa nene</h1>

            {props.hasHeader &&
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
            }

            {/*<Modal.Body>
                {props.contentBody}
        </Modal.Body>*/}

            {props.hasFooter &&
                <Modal.Footer >
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            }
        </Modal >
    );
}

export default MyModal;