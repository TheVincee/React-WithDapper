import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand href="#">
        
          <span className="text-xl font-semibold text-dark">POS Final</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inventory</Nav.Link>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/History">History</Nav.Link>
          </Nav>
          <Nav>
            <Button
              variant="outline-secondary"
              className="me-2"
              href="#"
            >
              Log in
            </Button>
            <Button variant="primary" href="#">
              Get started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
