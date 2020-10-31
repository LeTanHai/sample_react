import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Button, Table } from 'react-bootstrap';
import {SidebarContext} from "../../context/sidebarContext";
import {ModalsContext} from "../../context/modalsContext";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import Delete from "./modals/Delete.js";

const suppliesData = {listNotifications:[
    {id:1, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"},
    {id:2, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"},
    {id:3, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"},
    {id:4, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"},
    {id:5, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"},
    {id:6, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"},
    {id:7, product_code:"A7X2ZD6", product_name:"Ban Ve Thi Cong",content_notify:"Don hang can xu ly"}],totalSize:50};

const Notifications = () => {
    const {currentSidebarLink} = useContext(SidebarContext);
    const {showModal} = useContext(ModalsContext);
    const [listNotifications, setlistNotifications] = useState([]);
    const [totalSize, settotalSize] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        setlistNotifications(suppliesData.listNotifications);
        settotalSize(suppliesData.totalSize);
        return () => {
        }
    }, [currentPage]);

    const actionRow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_new_edit_notifications", type:"edit", data: row})}
                >
                    View Details
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
        { dataField: 'product_code', text: 'Product Code', headerAlign: "center"},
        { dataField: 'product_name', text: 'Product Name', headerAlign: "center"},
        { dataField: 'content_notify', text: 'Content Notify', headerAlign: "center"},
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
            {text: 'All', value: listNotifications.length}
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
                                                    data={ listNotifications }
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
            <Delete/>   
        </>
    )
}

export default Notifications
