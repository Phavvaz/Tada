import React from 'react';
import {Row, Col, Alert} from 'reactstrap';

const Alart = (props) => {

// const AlertTimeOut = () => setTimeout(() => console.log('success'), 1000);

  return(
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
