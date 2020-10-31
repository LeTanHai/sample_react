import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Button, Table } from 'react-bootstrap';
import {SidebarContext} from "../../context/sidebarContext";
import {ModalsContext} from "../../context/modalsContext";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import New_edit  from "./modals/New_edit";
import Delete from "./modals/Delete.js";

const suppliesData = {listSubplies:[{id:1, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},
                                    {id:2, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},                
                                    {id:3, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},
                                    {id:4, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},                
                                    {id:5, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},                
                                    {id:6, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},
                                    {id:7, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},
                                    {id:8, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},
                                    {id:9, subplier:"Tien Giang", unit:"cm", price:"30000", date_for_unit: "14/10/2020"},],totalSize:50};

const Subplies = () => {
    const {currentSidebarLink} = useContext(SidebarContext);
    const {showModal} = useContext(ModalsContext);
    const [listSubplies, setlistSubplies] = useState([]);
    const [totalSize, settotalSize] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        setlistSubplies(suppliesData.listSubplies);
        settotalSize(suppliesData.totalSize);
        return () => {
        }
    }, [currentPage]);

    const actionRow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <Button className="m-1" variant="primary"
                    onClick={()=>showModal({modal_name:"show_modal_new_edit_subplies", type:"edit", data: row})}
                >
                    Edit
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
        { dataField: 'subplier', text: 'Subplier', headerAlign: "center"},
        { dataField: 'unit', text: 'Unit', headerAlign: "center"},
        { dataField: 'price', text: 'Price', headerAlign: "center"},
        { dataField: 'date_for_unit', text: 'Date for unit', headerAlign: "center"},
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
            {text: 'All', value: listSubplies.length}
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
                            <Button className="mb-2" variant="primary" onClick={()=>showModal({modal_name:"show_modal_new_edit_subplies",type:"new"})}> New </Button>
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
                                                    data={ listSubplies }
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
            <Delete/>   
        </>
    )
}

export default Subplies
