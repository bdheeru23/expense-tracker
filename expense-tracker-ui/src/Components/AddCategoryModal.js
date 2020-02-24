import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container,FormGroup, Form,Button,Modal, ModalHeader, ModalBody,InputGroup,InputGroupAddon,Input} from 'reactstrap';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {inject,observer} from 'mobx-react';

class AddCategoryModal extends Component {
    emptyCategory = {
        id : 99999,
        name: '',
        user:null
    }
    constructor(props){
        super(props);
        this.state = { 
            categoryItem : this.emptyCategory,
            isModalOpen : false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleChange(event){
        const target= event.target;
        const value= target.value;
        const name = target.name;
        let categoryItem={...this.state.categoryItem};
        categoryItem[name] = value;
        this.setState({categoryItem});
        console.log(categoryItem);
    }

    async componentDidMount(){
        this.props.authStore.getUserDetails();

    }

    async handleSubmit(event){
        const user = this.props.authStore.userdetails;
        const item = this.state.categoryItem;
        item.user = {id:user.id,username:user.username}
        this.setState({item});
        console.log(item);
        axios.post('/api/category',item,{
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
        .catch(function(error){
            console.log(error);
        })
    
        event.preventDefault();
        this.toggleModal();
        this.props.history.push('/categories');
    }

    render() { 
        return ( 
            <div>
                <Button color="primary" className="btn float-right" onClick={this.toggleModal}>Add Category</Button>
                <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal} color="primary">
                    <ModalHeader toggle={this.toggleModal}>Add Category</ModalHeader>
                    <ModalBody>
                        <Container>
                            <Form onSubmit={this.handleSubmit}>
                                <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
                                        <Input type="name" name="name" id="name" placeholder="Category title" 
                                        onChange={this.handleChange} />
                                </InputGroup>
                                <br />
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
 
export default withRouter(inject("authStore")(observer(AddCategoryModal)));