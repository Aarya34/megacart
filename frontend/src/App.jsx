import React from 'react'
import { Container } from 'react-bootstrap' 
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container>
        <Outlet/>
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
    </>
   
  )
}

export default App