import React, {useState} from 'react';
import { Row, Col, Modal, ModalHeader } from 'reactstrap';

const MyModal = (props) => {
  const [Mod, SetMod] = useState(true);
  const Toggle = () => SetMod(!Mod);
   return (
     <Row>
       <Col>
     <Modal isOpen={Mod} toggle={Toggle}>
       <ModalHeader toggle={Toggle}>{props.children}</ModalHeader>
    </Modal>
    </Col>
  </Row>
 );
};

export default MyModal;
