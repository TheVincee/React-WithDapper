import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function FilterTable({ product, addToSelectedProducts }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="font-weight-bold">{product.name}</Card.Title>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Card.Text>Stock: {product.quantity}</Card.Text>
        <Button
          variant="primary"
          className="w-100"
          onClick={addToSelectedProducts}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
