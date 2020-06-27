import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

const Profile = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col md='3'>
          <p>My Profile</p>
          <Nav vertical>
            <NavItem>
              <NavLink tag={Link} to='/'>
                Link
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/'>
                Link
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/'>
                Another Link
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/'>
                Another Link
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <hr />
      <h1>hello</h1>
      <Outlet />
    </React.Fragment>
  );
};

export default Profile;
