import React from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Spin = (props) => {
  return (
    <Row>
      <Col>
        <Spinner color='primary' type='grow' />
        <Spinner color='secondary' type='grow' />
        <Spinner color='dark' type='grow' />
      </Col>
    </Row>
  );
};

export default Spin;
