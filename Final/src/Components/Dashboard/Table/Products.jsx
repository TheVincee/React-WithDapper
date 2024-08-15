import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Products({ product, decrementQuantity, incrementQuantity }) {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center mb-2 rounded-lg shadow-sm"
    >
      <span>
        {product.name} - ${product.price} x {product.quantity}
      </span>
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={decrementQuantity}
        >
          <FaMinus />
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={incrementQuantity}
        >
          <FaPlus />
        </Button>
      </div>
    </ListGroup.Item>
  );
}
