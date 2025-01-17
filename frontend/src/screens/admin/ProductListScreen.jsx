import React from 'react'
import { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation } from '../../slices/productsApiSlice' 
import { Link } from 'react-router-dom'
import { Table,Button,Row,Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {FaEdit,FaTrash} from 'react-icons/fa'
import { toast } from 'react-toastify'


const ProductListScreen = () => {
    const {data:products,isLoading,error,refetch} = useGetProductsQuery()
    const [createProduct,{isLoading:loadingCreate,error:errorCreate}] = useCreateProductMutation()
    const [deleteProduct,{isLoading:loadingDelete,error:errorDelete}] = useDeleteProductMutation()
    const deleteProductHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete this product?'))
            {
                try {
                    await deleteProduct(id)
                    refetch()
                } catch (error) {
                    toast.error(error?.data?.message || error.error)
                }
            }
    }
    const createProductHandler = async() => {
        if(window.confirm('Are you sure you want to create a product?'))
        {
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button className='btn-sm m-3' onClick ={createProductHandler}>
                <FaEdit/> Create Product
                </Button>
        </Col>
    </Row>
    {loadingCreate && <Loader/>}
    {loadingDelete && <Loader/>}
    {
      isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                            <FaEdit/>
                        </Button>
                    </Link>
             
                    <Button variant='danger' className='btn-sm' onClick={()=>deleteProductHandler(product._id)}>
                        <FaTrash/>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
    </>
)
}

export default ProductListScreen