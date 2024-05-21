import React from "react";
import { CartContext } from "./CartContext";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function ButtonExample({ onClick }) {
  const { cartItemCount } = React.useContext(CartContext)

  return (
    <Button variant="primary" onClick={onClick} >
      Cart {cartItemCount > 0 && <Badge bg="danger">{cartItemCount}</Badge>}
    </Button>
  )
}
