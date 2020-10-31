import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import {ModalsContext} from "../../../context/modalsContext";

const New_edit = () => {
    const {modal_control, closeModal} = useContext(ModalsContext);
    const [btnFooterModalName, setbtnFooterModalName] = useState("");
    const [fields_value, setfields_value] = useState({
        subplier: "",
        unit: "",
        price: "",
        date_for_unit: ""
    });

    useEffect(() => {
        switch (modal_control.type) {
            case "new":
                setfields_value({
                    subplier: "",
                    unit: "",
                    price: "",
                    date_for_unit: ""
                })
                setbtnFooterModalName("Save");
                break;
            case "edit":
                /* call api get data*/
                setbtnFooterModalName("Update");
                setfields_value({...fields_value,...modal_control.data});
                break;
            default:
                return;
        }
        return () => {
        }
    }, [modal_control.show_modal_new_edit_subplies])



    const handleNew = () => {
        console.log(fields_value);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setfields_value({...fields_value, [name]:value});
    }

    return (
        <>
            <Modal show={modal_control.show_modal_new_edit_subplies} onHide={()=>closeModal({modal_name:"show_modal_new_edit_subplies"})}>
                <Modal.Header closeButton>
                <Modal.Title> Add Subplier </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                    <Form.Label>Subplier</Form.Label>
                    <Form.Control name="subplier" type="text" placeholder="Enter subplier" value={fields_value.subplier} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Unit</Form.Label>
                    <Form.Control name="unit" type="text" placeholder="Enter unit" value={fields_value.unit} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" type="text" placeholder="Enter price" value={fields_value.price} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date for unit</Form.Label>
                    <Form.Control name="date_for_unit" type="text" placeholder="Enter " value={fields_value.date_for_unit} onChange={handleInputChange}/>
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
