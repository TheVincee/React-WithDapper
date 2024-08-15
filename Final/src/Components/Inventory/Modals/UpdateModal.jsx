import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function UpdateModal({
  isOpen,
  toggleModal,
  updateUsers,
  setAddProducts,
  product,
}) {
  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      onHide={toggleModal}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateUsers}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={product.Name}
              onChange={(e) =>
                setAddProducts({ ...product, Name: e.target.value })
              }
              placeholder="Enter product name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              value={product.sku}
              onChange={(e) =>
                setAddProducts({ ...product, sku: e.target.value })
              }
              placeholder="Enter SKU"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={product.price}
              onChange={(e) =>
                setAddProducts({ ...product, price: e.target.value })
              }
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              value={product.quantity}
              onChange={(e) =>
                setAddProducts({ ...product, quantity: e.target.value })
              }
              placeholder="Enter quantity"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={updateUsers}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
