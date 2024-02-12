import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Form, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../Services/allAPIs'

function Projects() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects , setAllProjects] = useState([])
  const getAllProjects = async()=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getAllProjectAPI(searchKey,reqHeader)
    if (result.status===200) {
     setAllProjects(result.data)
    }else{
      console.log(result);
    }
    }
    
  }
  console.log(allProjects);
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  return (
    <>
   <Header/>
   <div style={{marginTop:'100px',minHeight:'100vh'}} className="project-page-design">
    <div className="d-flex justify-content-between m-5">
      <h1>All Projects</h1>
      <Form className="d-flex shadow">
            <Form.Control onChange={e=>setSearchKey(e.target.value)}
              type="search"
              placeholder="Search projects"
              className="me-2"
              aria-label="Search"
            />
          </Form>
    </div>
    <Row className='mt-5 container-fluid'>
      {allProjects.length>0?allProjects.map((project,index)=>(
             <Col key={index} sm={12} md={6} lg={4}>
             <ProjectCard project={project}/>
           </Col>
      )):
      <div style={{height:'500px'}} className='d-flex justify-content-center  align-items-center '><h3 className='text-danger fs-4 fw-bold text-center'>NO Projects</h3></div>

      }
    </Row>
   </div>
    </>
  )
}

export default Projects