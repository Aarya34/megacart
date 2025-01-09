import React from "react";
import { Container, Nav, Navbar,Badge} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  // console.log(cartItems.qty)
  // console.log(cart.qty)
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} alt="MegaCart" width="30" height="30"  style={{ backgroundColor: "transparent" }}  />
            MegaCart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style= {{marginLeft: '5px'}}>
                    {cartItems.reduce( (acc, item) => acc + item.qty, 0)}
                    </Badge>
                )}
              </Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
