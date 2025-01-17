import React from 'react'
import { Link } from 'react-router-dom'
import { Table,Button,Row,Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {FaTimes,FaCheck,FaEdit,FaTrash} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useGetUsersQuery ,useDeleteUserMutation} from '../../slices/usersApiSlice'
const UserListScreen = () => {
    const {data:users,isLoading,error,refetch} = useGetUsersQuery()
    const [deleteUser,{isLoading:loadingDelete,error:errorDelete}] = useDeleteUserMutation()
    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete this user?'))
        {
            try {
                await deleteUser(id)
                toast.success('User Deleted Successfully')
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Users</h1>
        </Col>
    </Row>
    {loadingDelete && <Loader/>}
    {
      isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.isAdmin ? (<FaCheck style={{color:'green'}}/>) : (<FaTimes style={{color:'red'}}/>)}</td>
                <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                            <FaEdit/>
                        </Button>
                    </Link>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                        <FaTrash style={{color:'white'}}/>
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

export default UserListScreen