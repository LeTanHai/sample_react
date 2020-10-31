import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Button, Table } from 'react-bootstrap';
import {SidebarContext} from "../../context/sidebarContext";
import {ModalsContext} from "../../context/modalsContext";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import New_edit from "./modals/New_edit";

const orderData = {listOrder:[{id:1, customer_name:"Truong Sinh", order_date:"14/10/2020", drawing_name:"ban ve gia cong", status: "pendding"},
                            {id:2, customer_name:"Truong Sinh", order_date:"15/10/2020", drawing_name:"ban ve gia cong", status: "pendding"},
                            {id:3, customer_name:"Truong Sinh", order_date:"17/10/2020", drawing_name:"ban ve gia cong", status: "pendding"},
                            {id:4, customer_name:"Truong Sinh", order_date:"13/10/2020", drawing_name:"ban ve gia cong", status: "pendding"},
                            {id:5, customer_name:"Truong Sinh", order_date:"18/10/2020", drawing_name:"ban ve gia cong", status: "pendding"},
                            {id:6, customer_name:"Truong Sinh", order_date:"15/10/2020", drawing_name:"ban ve gia cong", status: "pendding"},
                            {id:7, customer_name:"Truong Sinh", order_date:"12/10/2020", drawing_name:"ban ve gia cong", status: "pendding"}],totalSize:50};

const Orders = () => {
    const {currentSidebarLink} = useContext(SidebarContext);
    const {showModal} = useContext(ModalsContext);
    const [listOrder, setlistOrder] = useState([]);
    const [totalSize, settotalSize] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        setlistOrder(orderData.listOrder);
        settotalSize(orderData.totalSize);
        return () => {
        }
    }, [currentPage]);

    const actionRow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_change_status", data: row})}
                >
                    Change Status
                </Button>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_change_password", data: row})}
                >
                    View Details
                </Button>
            </>
        );
    };

    const columns = [
        { dataField: 'id', text: 'ID', headerAlign: "center"},
        { dataField: 'customer_name', text: 'Customer Name', headerAlign: "center"},
        { dataField: 'drawing_name', text: 'Drawing Name', headerAlign: "center"},
        { dataField: 'order_date', text: 'Order Date', headerAlign: "center"},
        { dataField: 'status', text: 'status', headerAlign: "center"},
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
            {text: 'All', value: listOrder.length}
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
                        <Button className="mb-2" variant="primary" onClick={()=>showModal({modal_name:"show_modal_new_edit_order",type:"new"})}> New </Button>
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
                                                data={ listOrder }
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
    </>
  )
}

export default Orders
