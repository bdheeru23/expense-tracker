import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AppNav from './AppNav';
import Expenses from './Expenses'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
        <div>
            <AppNav />
            <Expenses /> 
        </div>
        );
    }
}
 
export default Home;