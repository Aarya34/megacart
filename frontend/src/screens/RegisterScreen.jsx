import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import { useState,useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import {toast} from 'react-toastify'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { USERS_URL,PRODUCTS_URL } from '../constants'
const RegisterScreen = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [register,{isLoading,error}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'
    useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
    }, [navigate, userInfo, redirect])
    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
            return
        }
        else{
        try {
           
            console.log(PRODUCTS_URL);
            console.log(USERS_URL);
            const res = await register({name,email,password}).unwrap()
            dispatch(setCredentials({...res,}));
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    }
  return (
    <FormContainer>
        <h1>SignUp</h1>
        <Form  onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mt-3'>
            
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name'
                value={name} onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </ Form.Group>
            <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' 
                value={email} onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password'
                value={password} onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password'
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </ Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>Sign Up</Button>
            {isLoading && <Loader />}
            <Row className='py-3'>
                <Col>
                    Already a Customer? <Link to='/login'>Login</Link>
                </Col>
            </Row>
            </Form>
    </FormContainer>
  )
}

export default RegisterScreen