import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext } from '../Context API/TokenAuth'

function Header({insideDashboard}) {
  const navigate = useNavigate()
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    navigate('/')
  }
  return (
    <Navbar className='shadow'>
      <Container>
        <Navbar.Brand className='fw-bolder fs-4'><Link to={'/'} className='text-decoration-none text-black'> <i class="fa-solid fa-laptop-code me-2 mt-1"></i>PROJECT FAIR</Link>
        </Navbar.Brand>
        {
            insideDashboard&&
            <div className='ms-auto'>
              <button onClick={handleLogout} className='btn text-dark'>Logout<i class="fa-solid fa-arrow-right-from-bracket ms-2"></i></button>
            </div>
          }
      </Container>
    </Navbar>
  )
}

export default Header