import React, { Component } from 'react';
import { Container,Input,Button, FormGroup, Form,InputGroup,InputGroupAddon,Modal, ModalHeader, ModalBody} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {inject,observer} from 'mobx-react';

class EditExpenseModal extends Component {

    emptyItem = {
        description : '' ,
        expenseDate : null,
        id:104,
        amount : 0,
        category : {id:1 , name:'Travel'},
        paymentType : ''
    }
    
    constructor(props){
        super(props);
        this.state = {
            item : this.props.expense,
            categories : []
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleDateChange= this.handleDateChange.bind(this);
        this.handleCategoryChange= this.handleCategoryChange.bind(this);
    }

    async componentDidMount(){

        this.props.categoryStore.loadCategories();
        console.log(this.state.item);

        axios.get('/api/categories')
        .then(response => {
            this.setState({categories:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    async handleSubmit(event){
     
        const item = this.state.item;
        axios.put('/api/expense',item,{
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

      

    state = {  }
    render() {
        
        let optionList  =
            this.props.categoryStore.categories.map( (category) =>
                <option id={category.id} key={category.id} value={category.name} selected={category.name===this.state.item.category.name ? true :false}>
                            {category.name} 
                </option>
            )
        return ( 
            <div>
                <Button size="sm" color="primary" className="btn float-right" onClick={this.toggleModal} >Edit</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} color="primary">
                    <ModalHeader toggle={this.toggleModal}>Edit Expense</ModalHeader>
                        <ModalBody>
                            <Container>
                                <Form onSubmit={this.handleSubmit}>
                                    <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
                                        <Input type="description" name="description" id="description" value={this.state.item.description} 
                                        onChange={this.handleChange} />
                                    </InputGroup>
                                    <br/>

                                    <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Category</InputGroupAddon>
                                        <select onChange={this.handleCategoryChange} id="category" name="category" selected={this.state.item.category.name}>
                                                {optionList}
                                        </select>
                                    </InputGroup>
                                    <br/>

                                    <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Expense Date</InputGroupAddon>
                                        <DatePicker selected={new Date(Date.parse(this.state.item.expenseDate))}  onChange={this.handleDateChange} format="MM/DD/YYYY" />
                                    </InputGroup>
                                    <br/>

                                    <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Amount</InputGroupAddon>
                                        <Input type="text" name="amount" id="amount" onChange={this.handleChange} value={this.state.item.amount}/>
                                    </InputGroup>
                                    <br/>

                                    <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Payment Type</InputGroupAddon>
                                        <Input type="text" name="paymentType" id="paymentType" onChange={this.handleChange} value={this.state.item.paymentType}/>
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
 
export default withRouter(inject("categoryStore")(observer(EditExpenseModal)));