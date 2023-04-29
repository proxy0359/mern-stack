import React from 'react';
import Modal from './Modal';
import Button from '../FormElements/Buttons';

const ErrorModal = (props) => {
  return (
    <Modal
      show={!!props.show}
      onCancel={props.onCancel}
      footer={<Button onClick={props.onCancel}>Cancel</Button>}
    >
      {props.children}
    </Modal>
  );
};

export default ErrorModal;
