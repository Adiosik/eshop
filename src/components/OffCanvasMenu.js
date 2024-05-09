import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from "./Cart";
import CartButton from "./CartButton";

function OffCanvasMenu({ name, ...props }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <CartButton onClick={handleShow} className="me-2">
        {name}
      </CartButton>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function OffCanvasExample() {
  return (
    <>
      {['top'].map((placement, idx) => (
        <OffCanvasMenu key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default OffCanvasExample;
