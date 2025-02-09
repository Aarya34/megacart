import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { Form,Button, FormGroup } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useUpdateProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation } from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
    const {id: productId} = useParams()
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)  
    const [description,setDescription] = useState('')
    const {data: product,isLoading,refetch,error} = useGetProductDetailsQuery(productId)
    const [updateProduct,{isLoading:loadingUpdate,error:errorUpdate}] = useUpdateProductMutation()
    const [uploadProductImage,{isLoading: loadingUpload}] = useUploadProductImageMutation()
    useEffect(() => {
        if(product)
        {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }
    ,[product])
    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image',e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            refetch()

        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
  return (
    <>
    
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
    <h1>Edit Product</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
    {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={async (e) => {
            e.preventDefault()
            try {
                await updateProduct({_id:productId,name,price,image,brand,category,countInStock,description})
                toast.success('Product Updated')
                navigate('/admin/productlist')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage}></Form.Control>
                <Form.Control type='file' label = 'Choose file' onChange={uploadFileHandler}></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>Update</Button>
        </Form>
    )}
    </>
  )
}

export default ProductEditScreen