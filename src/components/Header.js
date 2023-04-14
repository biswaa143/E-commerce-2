import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import CartContext from "./store/CartContext";
import { Link } from "react-router-dom";
import AuthContext from "./store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  }

  const ctx = useContext(CartContext);
  const orderlist = ctx.orderList;
  let cartItemCount = 0;
  orderlist.forEach((item) => {
    cartItemCount += item.quantity;
  });
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">My Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/store" className="nav-link">
              Store
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/movie" className="nav-link">
              Movies
            </Link>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
            {/* <Link to="/ProductDetail" className="nav-link">Products</Link> */}
            {!isLoggedIn && (
              <Link to="/auth" className="nav-link">
                Login
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            )}
            {isLoggedIn && (
              <Button onClick={logoutHandler} style={{ marginLeft: "25rem" }}>Logout</Button>
            )}
          </Nav>
          <Nav>
            <Button
              variant="outline-warning"
              onClick={() => ctx.setCartVisibility(true)}
            >{`Cart ${cartItemCount}`}</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
