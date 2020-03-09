import React, { useState } from 'react';
import { Navbar,Nav,NavItem,NavbarBrand,NavLink, NavbarToggler,Collapse} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FaHome,FaTag,FaMoneyBillWaveAlt } from 'react-icons/fa'
import { IoMdAnalytics } from 'react-icons/io'

const AppNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Expense Tracker Application</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/home"><FaHome/>Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/expenses"><FaMoneyBillWaveAlt/>Expenses</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/categories"><FaTag/>Categories</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/analysis"><IoMdAnalytics/>Analysis</NavLink>
                    </NavItem>
                  </Nav>
                  </Collapse>
              </Navbar>
            </div>
          );
}
 
export default AppNav;