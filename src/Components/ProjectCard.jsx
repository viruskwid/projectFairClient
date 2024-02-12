import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import {SERVER_URL }from '../Services/ServerUrl'
function ProjectCard({project}) {
  const [show , setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = ()=> setShow(true)
  
  return (
    <>
     {project && <Card style={{ width: '28rem',height:'300px'}} className='shadow btn mb-5' onClick={handleShow}>
      <Card.Img style={{height:'300px'}} width={'100%'} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>}

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img style={{height:'250px'}} className='img-fluid' src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
            </Col>
            <Col md={6}>
              <h2 className='fw-bolder text-dark'>{project?.title}</h2>
              <p>Project Overview : <span className='fw-bold' style={{textAlign:'justify'}}>{project?.overview}
                </span></p>
                <p>Language Used: <span className='fw-bolder text-danger'>{project?.languages}</span></p>
            </Col>
          </Row>
          <div className='mt-3'>
                  <a href="https://github.com/viruskwid/E-cart.git" target='__blank' className='btn me-3'><i style={{height:'40px'}} class="fa-brands fa-github fa-2x"></i></a>
                  <a href="https://employee-manager-three.vercel.app/" target='__blank' className='btn me-3'><i style={{height:'40px'}} class="fa-solid fa-link fa-2x"></i></a>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard