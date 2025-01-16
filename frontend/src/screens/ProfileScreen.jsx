import React from 'react'
import { useState,useEffect } from 'react'
import {Table,Form,Button,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import {FaTimes} from 'react-icons/fa'
const ProfileScreen = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [name,setName] = useState(userInfo?.name)
    const [email,setEmail] = useState(userInfo?.email)
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const dispatch = useDispatch()
    const [profile,{isLoading,error}] = useProfileMutation()
    const {data:orders,isLoading:loadingOrders,error:errorOrders} = useGetMyOrdersQuery()
    useEffect(() => {
        if(userInfo)
        {
           setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo,userInfo.name , userInfo.email])
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword)
        {
            toast.error('Passwords do not match')
        }
        else
        {
            try {
                const res = await profile({_id:userInfo._id,name,email,password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success('Profile Updated')
            } catch (error) {
                toast.error(error)
            }
        }
    }

  return (
    
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {isLoading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
                {isLoading && <Loader />}
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : <FaTimes style={{color:'red'}}/>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <FaTimes style={{color:'red'}}/>}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen