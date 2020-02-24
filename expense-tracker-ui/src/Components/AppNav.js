import React, { Component } from 'react';
import { Navbar,Nav,NavItem,NavbarBrand,NavLink} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FaHome,FaTag } from 'react-icons/fa'
import { IoMdAnalytics } from 'react-icons/io'

class AppNav extends Component {
    state = {  }
    render() { 
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Expense Tracker Application</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/home"><FaHome/>Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/categories"><FaTag/>Categories</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/analysis"><IoMdAnalytics/>Analysis</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </div>
          );
    }
}
 
export default AppNav;