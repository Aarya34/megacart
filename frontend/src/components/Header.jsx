import React from "react";
import { Container, Nav, Navbar,Badge,NavDropdown} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";


const Header = () => {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const {userInfo} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutUser] = useLogoutMutation()
  const logoutHandler = async () => {
    await logoutUser()
    dispatch(logout())
    navigate('/login')
  }
  const noUnderlineStyle = { textDecoration: 'none' };
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                    Sign In
                  </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>

                  <NavDropdown.Item href="/admin/productlist">Products</NavDropdown.Item>

                  <NavDropdown.Item href="/admin/orderlist">Orders</NavDropdown.Item>
              </NavDropdown>
              
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
