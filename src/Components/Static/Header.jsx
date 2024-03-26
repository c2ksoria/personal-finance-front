import React from 'react';
import { Container, Navbar} from 'react-bootstrap'
function Header() {
  return (
    <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Presupuesto Personal</Navbar.Brand>

        </Container>
      </Navbar>
    </div>
  )
}

export default Header;