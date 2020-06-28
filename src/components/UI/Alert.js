import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

const Alart = (props) => {
  return (
    <Row>
      <Col>
        <Alert color={props.color} fade>
          {props.children}
        </Alert>
      </Col>
    </Row>
  );
};

export default Alart;
