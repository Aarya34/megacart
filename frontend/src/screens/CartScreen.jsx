import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import { FaTrash} from "react-icons/fa";
import { addToCart,atCart,removeItem } from '../slices/cartSlice'
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const checkoutHandler = async () => {
        navigate('/login?redirect=/shipping')
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeItem({ id}))
    }
    return (
        <Row>
        <Col md={8}>
            <h1 style={{marginBottom: '20px'
            }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
            <Message>
                Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
            ) : (
            <ListGroup variant='flush'>
            {
                
            cartItems.map((item) => (
                <ListGroup.Item key={item .product._id}>
                <Row>
                    <Col md={2}>
                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                    <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                    </Col>
                    <Col md={2}>${item.product.price}</Col>
                    <Col md={2}>
                    <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) =>{ dispatch(atCart({ product: item.product,qty: Number(e.target.value) }))}}
                    >
                    {[...Array(item.product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x+1}>
                            {x + 1}
                    </option>
                    ))}
                    </Form.Control>
                    </Col>
                    <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product._id)}>
                        <FaTrash />
                    </Button>
                    </Col>
                </Row>
                </ListGroup.Item>
            
            ))}
            </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <h2>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    items
                </h2>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2)}
                </ListGroup.Item>
     
            <ListGroup.Item>
                <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                >
                Proceed To Checkout
                </Button>
            </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
        </Row>
    )
}

export default CartScreen
             