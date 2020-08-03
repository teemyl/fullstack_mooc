import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2 className='display-3'>Users</h2>
      <Table striped bordered size='sm'>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(u => (
              <tr key={ u.id }>
                <td><Link to={ `/users/${ u.id }` }>{ u.name }</Link></td>
                <td>{ u.blogs.length }</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default UserList