import React, { Component } from 'react';
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Categories from './Components/Categories';
import Home from './Components/Home';
import Analysis from './Components/Analysis';
import Login from './Components/authentication/Login';
import Register from './Components/authentication/Register';
import CategoryStore from './store/CategoryStore';
import ExpenseStore from './store/ExpenseStore';
import AnalysisStore from './store/AnalysisStore';
import {Provider} from 'mobx-react';


class App extends Component {

    

    state = {  }
    render() { 
        return ( 
            <Provider categoryStore={CategoryStore} expenseStore={ExpenseStore} analysisStore = {AnalysisStore}>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Login}/>
                        <Route path="/register" exact={true} component={Register}/>
                        <Route path='/home' exact={true} component={Home}/>
                        <Route path='/categories' exact={true} component={Categories}/>
                        <Route path='/analysis' exact={true} component={Analysis} />
                    </Switch>
                </Router>
             </Provider>
        );
    }
}
 
export default App;