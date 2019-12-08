import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { Table,Container,Button} from 'reactstrap';
import {inject,observer} from 'mobx-react';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';

class Expenses extends Component {

  // {
  //   "id": 100,
  //   "expensedate": "2019-06-16T17:00:00Z",
  //   "description": "New York Business Trip",
  //   "location": "New York",
  //   "category": {
  //   "id": 1,
  //   "name": "Travel"
  //   }
  //   },
 
    /* emptyItem = {
        description : '' ,
        expenseDate : new Date(),
        id:104,
        amount : 0,
        category : {id:1 , name:'Travel'}
    } */

    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        Expenses : [],
        date :new Date(),
        editItemIndex : null,
        itemToBeEdited : null
        //item : this.emptyItem
       }
       this.editExpense = this.editExpense.bind(this);
    } 


    async componentDidMount() {

        this.props.categoryStore.loadCategories();
        this.props.expenseStore.loadExpenses();
        this.props.expenseStore.loadTotalExpenses();

    }

    editExpense(id){
      this.setState({
        editItemIndex : id
      });
      console.log(this.state.editItemIndex);
      
    }

    render() { 
        const Expenses = this.props.expenseStore.expenses;
        if (this.props.expenseStore.isLoading)
            return(<div>Loading....</div>)
        
        let rows=
            Expenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'numeric',day:'2-digit',}).format(new Date(Date.parse(expense.expenseDate)))}</td>
                <td>{expense.amount}</td>
                <td>{expense.paymentType}</td>
                <td>{expense.category.name}</td>
                <td><EditExpenseModal expense={expense} categories = {this.state.Categories}/></td>
                <td><Button size="sm" color="danger" onClick={() => this.props.expenseStore.deleteExpense(expense.id)}>Delete</Button></td>
              </tr>
            )

        return (
            <div>

          {''}
              <Container>
                <AddExpenseModal />
                <h3>Expense List</h3>
                <h3 className="float-right">Total Expenses : {this.props.expenseStore.totalExpenses}</h3>
                <Table className="mt-4 table-striped">
                <thead>
                  <tr>
                    <th width="30%">Description</th>
                    <th width="10%">Date</th>
                    <th>Amount</th>
                    <th>Payment Type</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                   {rows}
                </tbody>

                </Table>
              </Container>

          }

        </div>

        );
    }
}
 
export default inject("expenseStore","categoryStore")(observer(Expenses));