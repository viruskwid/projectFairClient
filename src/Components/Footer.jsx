import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{ height: '240px' }} className='container w-100 mt-5'>
    <hr />
    <div className="footer-content d-flex justify-content-between">
      <div className="title w-25">
        <h3> <i class="fa-solid fa-laptop-code me-2"></i>
          PROJECT-FAIR</h3>
        <span style={{fontSize:'14px'}}>
          Designed and build with all the love in the world by the Bootstrap team with the help of our contributors

        </span><br />
        <span style={{fontSize:'14px'}}>Code licensed MIT, docs CC BY 3.0</span><br />
        <span style={{fontSize:'14px'}}>Currently v5.3.2</span>
      </div>
      <div className="links d-flex flex-column">
        <h4>Links</h4>
        <Link to={'/'} style={{ color: 'Black',  textDecoration:'none' }}>Home</Link>
        <Link to={'/projects'} style={{ color: 'Black', textDecoration:'none' }}>Projects</Link>
        <Link to={'/'} style={{ color: 'Black', textDecoration:'none' }}>Codes</Link>
      </div>

      <div className="guides d-flex flex-column">
        <h4>Guides</h4>
        <a  className='text-decoration-none' href="">React</a>
        <a  className='text-decoration-none' href="">React Bootstrap</a>
        <a  className='text-decoration-none' href="">React Routing</a>
      </div>
      <div className="contact d-flex flex-column">
        <h4>Contact Us</h4>
        <div className='d-flex'> 
        <input type="text" placeholder='Enter your mail' className='form-control' />
        <button className='btn btn-dark ms-2'><i class="fa-solid fa-arrow-right"></i></button>
        </div>          
        <div style={{ color: 'black' }} className="icons mt-3 d-flex justify-content-between">
          <i style={{ height: '50px' }} class="fa-solid fa-envelope fa-2x"></i>
          <i style={{ height: '50px' }} class="fa-brands fa-twitter fa-2x"></i>
          <i style={{ height: '50px' }} class="fa-brands fa-github fa-2x"></i>
          <i style={{ height: '50px' }} class="fa-brands fa-facebook fa-2x"></i>
          <i style={{ height: '50px' }} class="fa-brands fa-instagram fa-2x"></i>
          <i style={{ height: '50px' }} class="fa-brands fa-linkedin fa-2x"></i>

        </div>


      </div>



    </div>
    <p style={{fontSize:'14px'}} className='text-center mt4'>Copyright &copy;2023 Media Player . Build with React.</p>
  </div>
  )
}

export default Footer