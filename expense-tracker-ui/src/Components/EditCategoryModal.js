import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container,FormGroup, Form,Button,Modal, ModalHeader, ModalBody,InputGroup,InputGroupAddon,Input} from 'reactstrap';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditCategoryModal extends Component {

    constructor(props){
        super(props);
        this.state = { 
            categoryItem : this.props.category,
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

    async handleSubmit(event){
        const item = this.state.categoryItem;
        console.log(item);
        axios.put('/api/category',item,{
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
        this.props.history.push('/categories');
    }
    
    render() { 
        return ( 
            <div>
                <div>
                <Button color="primary" className="btn float-right" onClick={this.toggleModal}>Edit</Button>
                <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal} color="primary">
                    <ModalHeader toggle={this.toggleModal}>Edit Category</ModalHeader>
                    <ModalBody>
                        <Container>
                            <Form onSubmit={this.handleSubmit}>
                                <InputGroup className="input-group-sm">
                                        <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
                                        <Input type="name" name="name" id="name" value={this.state.categoryItem.name} 
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
            </div>
        );
    }
}
 
export default withRouter(EditCategoryModal);