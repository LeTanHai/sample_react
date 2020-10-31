import React, {useContext, useEffect, useState} from 'react';
import {ModalsContext} from "../../../context/modalsContext";
import { Modal, Button, Form } from 'react-bootstrap';

const ChangePassword = () => {
    const {modal_control, closeModal} = useContext(ModalsContext);
    const [fields_value, setfields_value] = useState({
        password: "",
        new_password: ""
    })

    useEffect(() => {
        setfields_value({
            password: "",
            new_password: ""
        })
        return () => {
        }
    }, [modal_control.show_modal_change_password])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setfields_value({...fields_value, [name]:value});
    }

    const handleResetPassword = () => {
        console.log(fields_value)
    }

    return (
        <>
            <Modal show={modal_control.show_modal_change_password} onHide={()=>closeModal({modal_name:"show_modal_change_password"})}>
                <Modal.Header closeButton>
                <Modal.Title> Change Password </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter Old Password" value={fields_value.password} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control name="new_password" type="password" placeholder="Enter New Password" value={fields_value.new_password} onChange={handleInputChange}/>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleResetPassword}>
                    Reset Password
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ChangePassword
