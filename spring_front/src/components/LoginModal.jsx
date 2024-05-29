import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Login from '@/User/Login';

const LoginModal = ({ show, handleClose }) => {
  // Define a function to handle successful login
  const handleLoginSuccess = () => {
    // Call the handleClose function to close the modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pass handleLoginSuccess function as a prop to the Login component */}
        <Login handleLoginSuccess={handleLoginSuccess} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
