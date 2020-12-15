import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from "react-router-dom"
import { setMessage } from '../reducers/notificationReducer'
import { Nav, Button } from 'react-bootstrap'

const Navbar = ({ user, setUser }) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear()
    setUser(null)
    history.push('/')
    dispatch(setMessage('Logged out.'))
  }

  return (
    <Nav defaultActiveKey="/">
      {user !== null ?
        <>
          <Nav.Item >
            <Link className="nav-link" to="/"><Button>Home</Button></Link>
          </Nav.Item>
          <Nav.Item >
            <Link className="nav-link" to="/blogs"><Button>Blogs</Button></Link>
          </Nav.Item >
          <Nav.Item >
            <Link className="nav-link" to="/create"><Button>Create</Button></Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/users"><Button>Users</Button></Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/"><Button onClick={handleLogout}>Logout</Button></Link>
          </Nav.Item>
        </>
        :
        <>
          <Nav.Item>
            <Link className="nav-link" to="/"><Button>Home</Button></Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/login"><Button>Login</Button></Link>
          </Nav.Item>
        </>
      }
    </Nav >
  )
}

export default Navbar