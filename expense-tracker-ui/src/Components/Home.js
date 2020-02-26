import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardBody, CardLink, CardTitle, CardSubtitle,Row,Col,Container } from 'reactstrap';
import { FaTag,FaMoneyBillWaveAlt } from 'react-icons/fa'
import { IoMdAnalytics } from 'react-icons/io'

class Home extends Component {
    render() { 
        return ( 
        <div>
            <Container>
            <Row>
                <Col sm="4">
            <Card>
                <CardBody>
                    <CardTitle>Expenses</CardTitle>
                    <CardSubtitle>Add/Edit/View your expenses</CardSubtitle>
                </CardBody>
                <span align="center"><FaMoneyBillWaveAlt size={70}/></span>
                <CardBody>
                    <CardLink href="/expenses">Click here</CardLink>
                </CardBody>
            </Card>
            </Col>
            <Col sm="4">
            <Card>
                <CardBody>
                    <CardTitle>Categories</CardTitle>
                    <CardSubtitle>Add/Edit/View your categories</CardSubtitle>
                </CardBody>
                <span align="center"><FaTag size={70}/></span>
                <CardBody>
                    <CardLink href="/categories">Click here</CardLink>
                </CardBody>
            </Card>
            </Col>
            <Col sm="4">
            <Card>
                <CardBody>
                    <CardTitle>Analysis</CardTitle>
                    <CardSubtitle>Analyze your expenses per categories</CardSubtitle>
                </CardBody>
                <span align="center"><IoMdAnalytics size={70}/></span>
                <CardBody>
                    <CardLink href="/analysis">Click here</CardLink>
                </CardBody>
            </Card>
            </Col>
            </Row>
            </Container>
        </div>
        );
    }
}
 
export default Home;