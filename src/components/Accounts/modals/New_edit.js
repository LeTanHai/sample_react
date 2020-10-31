import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import {ModalsContext} from "../../../context/modalsContext";

const dataRole = [{text:"Admin", value: 1},{text:"Engineering", value:2}, {text:"Management", value: 3}];

const New_edit = () => {
    const {modal_control, closeModal} = useContext(ModalsContext);
    const [btnFooterModalName, setbtnFooterModalName] = useState("");
    const [listRole, setlistRole] = useState([]);
    const [fields_value, setfields_value] = useState({
        fullname: "",
        username: "",
        phone: "",
        role: "",
        password: ""

    });

    useEffect(() => {
        setlistRole(dataRole);
        switch (modal_control.type) {
            case "new":
                setfields_value({
                    fullname: "",
                    username: "",
                    phone: "",
                    role: 1,
                    password: ""
                })
                setbtnFooterModalName("Save");
                break;
            case "edit":
                /* call api get data*/
                setbtnFooterModalName("Update");
                setfields_value({...fields_value,...modal_control.data, password:""});
                break;
            default:
                return;
        }
        return () => {
        }
    }, [modal_control.show_modal_new_edit_account])



    const handleNew = () => {
        console.log(fields_value);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setfields_value({...fields_value, [name]:value});
    }

    return (
        <>
            <Modal show={modal_control.show_modal_new_edit_account} onHide={()=>closeModal({modal_name:"show_modal_new_edit_account"})}>
                <Modal.Header closeButton>
                <Modal.Title> Add Account </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="fullname" type="text" placeholder="Enter name" value={fields_value.fullname} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter name" value={fields_value.username} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="phone" type="text" placeholder="Enter phone" value={fields_value.phone} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Role</Form.Label>
                    <Form.Control value={fields_value.role} name="role" onChange={handleInputChange} as="select">
                        {listRole.map((item, index)=> {
                            return (<option key={index} value={item.value}>{item.text}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={fields_value.password} onChange={handleInputChange}/>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleNew}>
                    {btnFooterModalName}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default New_edit
