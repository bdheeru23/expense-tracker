import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Input,Button, FormGroup, Form,InputGroup,InputGroupAddon,Navbar,NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username:'',
            password:''
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event){
        this.setState({
            username : event.target.value
        });
    }

    handlePasswordChange(event){
        this.setState({
            password : event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const payload = {
            "username" : this.state.username,
            "password" : this.state.password
        }
        axios.post("/authenticate",payload,
        {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status ==  200){
                sessionStorage.setItem("authToken",res.data.token);
                this.props.history.push("/home")
            }
        })
        .catch(console.log("Error generating auth token"))
    }

    render() { 
        return ( 
            <div>
                <Container className="col-sm-3">
                    <div>
                    <Navbar color="light" light>
                        <NavbarBrand>Login</NavbarBrand>
                        <Nav pills>
                            <NavItem className="float-right">
                                <NavLink href="/register" active>Register</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="input-group-sm">
                            <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                            <Input type="text" name="username" id="username" placeholder="Username" 
                                onChange={this.handleUsernameChange} />
                        </InputGroup>
                        <br/>
                        <InputGroup className="input-group-sm">
                            <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
                            <Input type="password" name="password" id="password" placeholder="Password" 
                                onChange={this.handlePasswordChange} />
                        </InputGroup>
                        <br/>
                        <FormGroup>
                            <Button color="primary" type="submit">Login</Button>{' '}
                        </FormGroup>
                    </Form>
                    </div>
                </Container>
            </div>
         );
    }
}
 
export default withRouter(Login);