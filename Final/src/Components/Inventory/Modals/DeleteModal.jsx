import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteModal({ isOpen, toggleModal, handleDeleteProduct }) {
  return (
    <Modal
      show={isOpen}
      onHide={toggleModal}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
