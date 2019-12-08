import React, { Component } from 'react';
import { Container,Input,Button, FormGroup, Form,InputGroup,InputGroupAddon,Modal, ModalHeader, ModalBody} from 'reactstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {withRouter} from 'react-router-dom';

class AddExpenseModal extends Component {
  
  emptyItem = {
    description : '' ,
    expenseDate : new Date(),
    id:999999,
    amount : 0,
    category : {id:1 , name:'Travel'},
    paymentType : ''
}

constructor(props){
    super(props);
    this.state = { 
        isLoading:true,
        Categories:[],
        date :new Date(),
        item : this.emptyItem,
        isModalOpen : false
     }

    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleDateChange= this.handleDateChange.bind(this);
    this.handleCategoryChange= this.handleCategoryChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

}
toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
}

async handleSubmit(event){
 
    const item = this.state.item;
    axios.post('/api/expense',item,{
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
  .catch(function(error){
      console.log(error);
  })
    
    event.preventDefault();
    this.toggleModal();
    this.props.history.push('/');
  }


  handleChange(event){
    const target= event.target;
    const value= target.value;
    const name = target.name;
    let item={...this.state.item};
    item[name] = value;
    this.setState({item});
    console.log(item);
  }

  handleCategoryChange(event){
      let idx = event.target.selectedIndex;
      let id = event.target.options[idx].id;
      let value = event.target.options[idx].value;
      let item = {...this.state.item};
      item.category = {id:id,name:value}
      this.setState({item});
      console.log(item);
      console.log(id+value);
  }


  handleDateChange(date){
    let item={...this.state.item};
    item.expenseDate= date;
    this.setState({item});
  
  }

async componentDidMount() {

    axios.get('/api/categories')
    .then(response => {
        this.setState({Categories:response.data,isLoading:false});
    })
    .catch(function(error){
        console.log(error);
    })

}

render(){
    const {Categories} =this.state;
    let optionList  =
            Categories.map( (category) =>
                <option id={category.id} key={category.id} value={category.name}>
                            {category.name} 
                </option>
            ) 
  return (
    <div>
      <Button color="primary" className="btn float-right" onClick={this.toggleModal} >Add Expense</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} color="primary">
        <ModalHeader toggle={this.toggleModal}>Add Expense</ModalHeader>
        <ModalBody>
        <Container>
            <h2>Add Expense</h2>
            
            <Form onSubmit={this.handleSubmit}>
            <InputGroup className="input-group-sm">
                <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
                <Input type="description" name="description" id="description" placeholder="Expense description" 
                onChange={this.handleChange} />
            </InputGroup>
            <br/>

            <InputGroup className="input-group-sm">
                <InputGroupAddon addonType="prepend">Category</InputGroupAddon>
                <select onChange={this.handleCategoryChange} id="category" name="category">
                        {optionList}
                </select>
            </InputGroup>
            <br/>

            <InputGroup className="input-group-sm">
                <InputGroupAddon addonType="prepend">Expense Date</InputGroupAddon>
                <DatePicker    selected={this.state.item.expenseDate}  onChange={this.handleDateChange} />
            </InputGroup>
            <br/>

            <InputGroup className="input-group-sm">
                <InputGroupAddon addonType="prepend">Amount</InputGroupAddon>
                <Input type="text" name="amount" id="amount" onChange={this.handleChange} placeholder="Expense amount"/>
            </InputGroup>
            <br/>

            <InputGroup className="input-group-sm">
                <InputGroupAddon addonType="prepend">Payment Type</InputGroupAddon>
                <Input type="text" name="paymentType" id="paymentType" onChange={this.handleChange} placeholder="Cash/Debit Card/Credit Card/Prepaid Card"/>
            </InputGroup>
            <br/>
            <FormGroup>
                <Button color="primary" type="submit">Save</Button>{' '}
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </FormGroup>
            </Form>
        </Container>
        </ModalBody>
      </Modal>
    </div>
  );
}
}

export default withRouter(AddExpenseModal);