import { ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectModal } from '../../../../redux/modalSlice';

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
        dispatch(closeModal());
    }

    return (
        <Modal show={modal.isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                {props.hasHeader &&
                    <Modal.Title>{modal.title && modal.title}</Modal.Title>
                }
            </Modal.Header>

            {props.contentBody &&
                <Modal.Body>
                    {props.contentBody}
                </Modal.Body>
            }

            {
                props.hasFooter &&
                <Modal.Footer >
                    {/*<Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>*/}
                    {modal.contentFooter}
                </Modal.Footer>
            }
        </Modal >
    );
}

export default MyModal;