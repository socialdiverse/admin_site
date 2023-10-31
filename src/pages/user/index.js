import React from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../components/common/BreadCrumb';

// Import Table Data
import {  CardTableExample } from './GridTablesData';

const UserPage = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Grid Js | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Quản lý người dùng" pageTitle="" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Quản lý người dùng</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-card" className="table-card">
                                        <CardTableExample />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>   
                </Container>
            </div>
        </React.Fragment>
    );
};

export default UserPage;