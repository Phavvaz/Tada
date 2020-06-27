import React, { useState } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Styles from './layout.module.css';
import { Link } from 'react-router-dom';
import TadaLogo from '../../assets/Tada_01.svg';

import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useSelector, shallowEqual } from 'react-redux';

const Layout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const token = useSelector(
    (state) => state.auth.idToken != null,
    shallowEqual
  );

  return (
    <Auxiliary>
      <div style={{ backgroundColor: '#effcf6', height: '710px' }}>
        <Row>
          <Col sm={{ size: '4', offset: '4' }}>
            <img src={TadaLogo} className={Styles.img} alt='Tada' />
          </Col>
        </Row>

        <Row>
          <Col sm='7'></Col>
          <Col sm='5'>
            <Navbar color='grey' light expand='sm' className={Styles.Navbar}>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className='mr-auto' navbar>
                  {token ? (
                    <NavItem className={Styles.Nav} onClick={toggle}>
                      <NavLink
                        tag={Link}
                        to='/AddExpense'
                        className={Styles.NavItem}
                      >
                        Add Expenses
                      </NavLink>
                    </NavItem>
                  ) : null}
                  {token ? (
                    <NavItem className={Styles.Nav} onClick={toggle}>
                      <NavLink
                        tag={Link}
                        to='/MyExpenses'
                        className={Styles.NavItem}
                      >
                        My Expenses
                      </NavLink>
                    </NavItem>
                  ) : null}
                  {/* <NavItem className={Styles.Nav} onClick={toggle}>
                    <NavLink
                      tag={Link}
                      to='/Profile'
                      className={Styles.NavItem}
                    >
                      Profile
                    </NavLink>
                  </NavItem> */}
                  {token ? null : (
                    <NavItem className={Styles.Nav} onClick={toggle}>
                      <NavLink
                        tag={Link}
                        to='/SignUp'
                        className={Styles.NavItem}
                      >
                        Sign Up
                      </NavLink>
                    </NavItem>
                  )}
                  {token ? (
                    <NavItem className={Styles.Nav} onClick={toggle}>
                      <NavLink
                        tag={Link}
                        to='/logout'
                        className={Styles.NavItem}
                      >
                        Logout
                      </NavLink>
                    </NavItem>
                  ) : (
                    <NavItem className={Styles.Nav} onClick={toggle}>
                      <NavLink
                        tag={Link}
                        to='/login'
                        className={Styles.NavItem}
                      >
                        Login
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>

        <div>{props.children}</div>
      </div>
    </Auxiliary>
  );
};

export default Layout;
