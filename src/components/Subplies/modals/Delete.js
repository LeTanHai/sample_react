import React, {useContext} from 'react';
import {ModalsContext} from "../../../context/modalsContext";
import { Modal, Button, Form } from 'react-bootstrap';

const Delete = () => {
    const {modal_control, closeModal} = useContext(ModalsContext);

    const handleDelete = () => {
        console.log("delete Subplies", modal_control.data);
    }

    return (
        <>
            <Modal show={modal_control.show_modal_delete} onHide={()=>closeModal({modal_name:"show_modal_delete"})}>
                <Modal.Header closeButton>
                    <Modal.Title> Delete </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> Do you want to delete this account? </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={()=>handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Delete
