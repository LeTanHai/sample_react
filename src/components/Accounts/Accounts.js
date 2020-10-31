import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Button, Table } from 'react-bootstrap';
import {SidebarContext} from "../../context/sidebarContext";
import {ModalsContext} from "../../context/modalsContext";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import New_edit  from "./modals/New_edit";
import ChangePassword from "./modals/ChangePassword";
import Delete from "./modals/Delete";

const userData = {listAccount:[{id:1, username:"abcd@gmail.com", role:1, fullname:"Nguyen Van A", phone: "0123456789"},
                {id:2, username:"asdasdd@gmail.com", role:2, fullname:"Nguyen Van A", phone: "0123456789"},
                {id:3, username:"ccccd@gmail.com", role:3, fullname:"Nguyen Van A", phone: "0123456789"},
                {id:4, username:"abcd@gmail.com", role:2, fullname:"Nguyen Van A", phone: "0123456789"},
                {id:5, username:"abcd@gmail.com", role:1, fullname:"Nguyen Van A", phone: "0123456789"},
                {id:6, username:"abcd@gmail.com", role:3, fullname:"Nguyen Van A", phone: "0123456789"}],totalSize:50};

const Accounts = () => {
    const {currentSidebarLink} = useContext(SidebarContext);
    const {showModal} = useContext(ModalsContext);
    const [listAccount, setlistAccount] = useState([]);
    const [totalSize, settotalSize] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        setlistAccount(userData.listAccount);
        settotalSize(userData.totalSize);
        return () => {
        }
    }, [currentPage]);

    const actionRow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_new_edit_account", type:"edit", data: row})}
                >
                    Edit
                </Button>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_change_password", data: row})}
                >
                    Change Password
                </Button>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_delete", data: row})}
                >
                    Delete
                </Button>
            </>
        );
    };

    const columns = [
        { dataField: 'id', text: 'ID', headerAlign: "center"},
        { dataField: 'username', text: 'User Name', headerAlign: "center"},
        { dataField: 'role', text: 'Role', headerAlign: "center"},
        { dataField: 'fullname', text: 'Full Name', headerAlign: "center"},
        { dataField: 'phone', text: 'Phone', headerAlign: "center"},
        {
            dataField: "action",
            text: "Action",
            formatter: actionRow,
            sort: true,
            headerAlign: "center"
        }
    ];

    const pagination = {
        custom: true,
        page: currentPage,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        totalSize: totalSize,
        sizePerPageList: [
            {text: '5', value: 5}, 
            {text: '10', value: 10}, 
            {text: 'All', value: listAccount.length}
        ],
        onPageChange: function (page) {
            setcurrentPage(page);
        }
    };

    return (
        <>
            <Row className="card-container">
                <Col xl="12">
                    <Card>
                        <Card.Header as="h5">{currentSidebarLink}</Card.Header>
                        <Card.Body>
                            <Button className="mb-2" variant="primary" onClick={()=>showModal({modal_name:"show_modal_new_edit_account",type:"new"})}> New </Button>
                            <Row>
                                <Col>
                                <PaginationProvider
                                    pagination={ paginationFactory(pagination) }
                                    >
                                    {
                                        ({
                                        paginationProps,
                                        paginationTableProps
                                        }) => (
                                            <div>
                                                <BootstrapTable
                                                    keyField='id'
                                                    data={ listAccount }
                                                    columns={columns}
                                                    { ...paginationTableProps }
                                                    striped hover
                                                    bootstrap4
                                                    wrapperClasses="table-responsive"
                                                    rowClasses={ "text-center" }
                                                >
                                                </BootstrapTable>
                                                <PaginationTotalStandalone
                                                { ...paginationProps }
                                                />
                                                <PaginationListStandalone
                                                { ...paginationProps }
                                                />
                                            </div>
                                        ) 
                                    }
                                    </PaginationProvider>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <New_edit/>
            <ChangePassword/>
            <Delete/>   
        </>
    )
}

export default Accounts
