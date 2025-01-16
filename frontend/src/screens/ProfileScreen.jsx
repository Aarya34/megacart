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
const ProfileScreen = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [name,setName] = useState(userInfo?.name)
    const [email,setEmail] = useState(userInfo?.email)
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const dispatch = useDispatch()
    const [profile,{isLoading,error}] = useProfileMutation()
    useEffect(() => {
        if(!userInfo)
        {
            window.location.href = '/login'
        }
    }, [userInfo])
    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setMessage('Passwords do not match')
        }
        else
        {
            try {
                const res = await profile({name,email,password})
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
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            
        </Col>
    </Row>
  )
}

export default ProfileScreen