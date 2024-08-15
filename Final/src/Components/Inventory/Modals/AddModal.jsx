import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddModal({
  isOpen,
  addUsers,
  setAddProducts,
  product,
  toggleModal,
}) {
  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={addUsers}>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={product.Name}
              onChange={(e) =>
                setAddProducts({ ...product, Name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="sku" className="mt-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              value={product.sku}
              onChange={(e) =>
                setAddProducts({ ...product, sku: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={product.price}
              onChange={(e) =>
                setAddProducts({ ...product, price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="quantity" className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              value={product.quantity}
              onChange={(e) =>
                setAddProducts({ ...product, quantity: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
