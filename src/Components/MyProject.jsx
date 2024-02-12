import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../Components/AddProject'
import EditProject from '../Components/EditProject'
import { deleteProjectAPI, getUserProjectAPI } from '../Services/allAPIs'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectResponseContext, editProjectResponseContext } from '../Context API/ContextShare'
function MyProject() {
  const {addProjectResponse , setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse , setEditProjectResponse} = useContext(editProjectResponseContext)

  const [allProjects , setAllProjects] = useState([])
  const getUserProjects = async()=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getUserProjectAPI(reqHeader)
    if (result.status===200) {
     setAllProjects(result.data)
    }else{
      console.log(result);
    }
    }
    
  }
  useEffect(()=>{
    getUserProjects()

  },[addProjectResponse,editProjectResponse])

  const handleDeleteProject = async(id)=>{
    const token = sessionStorage.getItem("token")
    if (token) {
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    try{
         const result = await deleteProjectAPI(id,reqHeader)
         if (result.status===200) {
          getUserProjects()
         }else{
         toast.warning(result.response.data)
         }
    }catch(err){
      console.log(err);
    }
    }
  }
  return (
    <div className='card shadow p-3'>
    <div className="d-flex justify-content-between">
      <h3>My Project</h3>
      <div> <AddProject/> </div>
    </div>
    <div className="mt-4">
     {allProjects.length>0? allProjects.map((project,index)=>(
        <div key={index} className="border rounded d-flex justify-content-between align-items-center text-danger mb-3 p-2">
        <h5>{project.title}</h5>
        <div className="d-flex icons align-items-center">
          <EditProject project={project}/>
          <a target='_blank' className='btn' href={project.github}><i className="fa-brands fa-github fa-2x"></i></a>
          <button onClick={()=>handleDeleteProject(project?._id)} className='btn'><i className="fa-solid fa-trash fa-2x"></i></button>
        </div>
      </div>
     )):
       <div className="text-danger fs-4 fw-bolder">No projects</div>
     }
    </div>
    <ToastContainer
            autoClose={4000}
            theme="colored"
            position="top-center"
          />
    </div>
  )
}

export default MyProject