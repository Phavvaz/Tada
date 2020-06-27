import React from 'react';
import Auxiliary from './Auxiliary';
import ErrorModal from '../components/UI/ErrorModal';

const WithErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    return (
      <Auxiliary>
      <ErrorModal axios={axios} />
      <WrappedComponent {...props}/>
      </Auxiliary>
    );
  }
};

export default WithErrorHandler;
