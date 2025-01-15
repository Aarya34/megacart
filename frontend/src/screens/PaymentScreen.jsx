import React from 'react'
import { useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button,Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'
const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    }, [shippingAddress,navigate])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        className='my-2'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
            
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen