import React, {useState, useEffect} from 'react';
import { Row, Col, Modal, ModalHeader } from 'reactstrap';


const ErrorModal = (props) => {

  useEffect(()=> {
    props.axios.interceptors.request.use(req => {
      SetError(null);
      return req;
    });
    props.axios.interceptors.response.use(res => res,
          err => {
            SetError(err);
            SetMod(true);
          }
    );
  });
   const [Error, SetError] = useState(null);
   const [Mod, SetMod] = useState(false);
   const Toggle = () => SetMod(!Mod);

   const ErrorConfirmedHandler = () => {
     SetError(null);
     Toggle();
   };

   return (
     <Row>
       <Col>
     <Modal isOpen={Mod} toggle={ErrorConfirmedHandler}>
       <ModalHeader toggle={ErrorConfirmedHandler}>
          {Error ? Error.message : null}
       </ModalHeader>
    </Modal>
    </Col>
  </Row>
 );
};

export default ErrorModal;
