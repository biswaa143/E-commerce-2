import ProductCard from "../components/Layout/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import CartContext from "../components/store/CartContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function StorePage() {
  const ctx = useContext(CartContext);
  const productsArr = ctx.productsList;

  const isLoggedIn = false;
  
  if (!isLoggedIn) {
    return ( <Navigate to="/login" /> )
  }
  
  const productsList = productsArr.map((product) => {
    return (
      <Col key={product.url}>
        {" "}
        <ProductCard item={product}></ProductCard>
      </Col>
    );
  });

  return (
    <>
      <Container>
        <Row>{productsList}</Row>
      </Container>
    </>
  );
}

export default StorePage;
