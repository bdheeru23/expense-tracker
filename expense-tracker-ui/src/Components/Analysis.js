import React, { Component } from 'react';
import ExpenseByCategory from './charts/ExpenseByCategory';
import ExpenseByPaymentTypes from './charts/ExpenseByPaymentTypes';
import AppNav from './AppNav';
import {Card,CardBody,CardTitle,Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Analysis extends Component {
    
    render() { 
        return ( 
            <div>
                <AppNav/>
                <Container>
                    <div className="col-12 col-md-6 col-sm-4">
                        <Card>
                            <CardTitle>Expenses by Category</CardTitle>
                            <CardBody><ExpenseByCategory /></CardBody>
                        </Card>
                        <Card>
                            <CardTitle>Expenses by Payment type</CardTitle>
                            <CardBody><ExpenseByPaymentTypes /></CardBody>
                        </Card>
                    </div>
                </Container>
           </div>     
        );
    }
}
 
export default Analysis;