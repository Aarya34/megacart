import React from 'react'
import { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCart } from '../slices/cartSlice'


const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }
        if(!cart.paymentMethod){
            navigate('/payment')
        }
    }, [cart,navigate])
    const [createOrder, { isLoading, error }] = useCreateOrderMutation()

    const placeOrderhandler = async () => {

        try
        {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,

                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap()
            dispatch(clearCart())
            navigate(`/order/${res._id}`)
            toast.success('Order Placed Successfully')
        }
        catch( error)
        {
            toast.error('Order Placed Failed')
        }
    }
  return (
   
    <>
    <CheckoutSteps step1 step2 step3 step4 />
    <Row>
        <Col md={8}>
        <ListGroup variant='flush'>

            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Address:</strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.product.image} alt={item.product.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.product.price} = ${item.qty * item.product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {/* {error && <Message variant='danger'>{error}</Message>} */}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderhandler}>Place Order</Button>
                        {/* {isLoading && <Loader />} */}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen 