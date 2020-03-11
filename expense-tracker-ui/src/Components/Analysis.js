import React, { Component } from 'react';
import ExpenseByCategory from './charts/ExpenseByCategory';
import ExpenseByPaymentTypes from './charts/ExpenseByPaymentTypes';
import AppNav from './AppNav';
import {Card,CardBody,CardTitle,Container,Row,Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Analysis extends Component {
    
    render() { 
        return ( 
            <div>
                <AppNav/>
                <Container>
                    <Row>
                        <Col>
                        <Card>
                            <CardTitle>Expenses by Category</CardTitle>
                            <CardBody><ExpenseByCategory /></CardBody>
                        </Card>
                        <Card>
                            <CardTitle>Expenses by Payment type</CardTitle>
                            <CardBody><ExpenseByPaymentTypes /></CardBody>
                        </Card>
                        </Col>
                        </Row>
                </Container>
           </div>     
        );
    }
}
 
export default Analysis;