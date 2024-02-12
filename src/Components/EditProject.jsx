import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SERVER_URL } from '../Services/ServerUrl';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProjectAPI } from '../Services/allAPIs';
import { editProjectResponseContext } from '../Context API/ContextShare';
function EditProject({project}) {
  const {editProjectResponse , setEditProjectResponse} = useContext(editProjectResponseContext)

  const [show,setShow] = useState(false)
  const [projectData , setprojectData] = useState({
  id:project._id ,  title:project.title , languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImages:""
  })
  const [preview , setPreview] = useState("")
  useEffect(()=>{
    if (projectData.projectImages) {
      setPreview(URL.createObjectURL(projectData.projectImages))
    }else{

      setPreview("")
    }
  },[projectData.projectImages])

  const handleShow = ()=> setShow(true)
  const handleClose = ()=> {
    setShow(false)
    setprojectData({
      id:project._id ,  title:project.title , languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImages:""
  
    })
    setPreview("")
  }
  const handleUpdate = async ()=>{
    const {title , languages , overview , github , website,projectImages,id} = projectData

    if (!title || !languages || !overview || !github || ! website) {
      toast.warn("Please fill the fields")
    }else{
        //api call - reqbody
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        preview?reqBody.append("projectImages",projectImages):reqBody.append("projectImages",project.projectImages)
        const token = sessionStorage.getItem('token')
        console.log(token)
        if (token) {
          const reqHeader={
            "Content-Type":preview?"multipart/form-data":"application/json",
            "Authorization":`Bearer ${token}`
          }
          //api call
          try{
            const result = await editProjectAPI(id,reqBody,reqHeader)
            console.log(result);
            if (result.status===200) {
              handleClose()
              setEditProjectResponse(result.data)
            }else{
              toast.warning(result.response.data)
            }
          }catch(err){
            console.log(err);
          }
       }
    }
  }
  return (
    <>
<button onClick={handleShow} className="btn"><i class="fa-solid fa-pen-to-square fa-2x"></i></button>    <Modal size='lg' className='text-center'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
            <label className='text-center'> 
         <input style={{display:'none'}} type='file' onChange={e=>setprojectData({...projectData,projectImages:e.target.files[0]})}/>
         <img style={{height:'250px'}}  className='w-100'  src={preview?preview:`${SERVER_URL}/uploads/${project.projectImages}`} alt="upload project image" />
         </label>
            </div>
            <div className="col-lg-6">
            <div className='mb-3'>
                    <input type="text" className="form-control" placeholder='Project Title'  value={projectData.title} onChange={e=>setprojectData({...projectData,title:e.target.value})} />
               </div>
                <div className='mb-3'>
                    <input value={projectData.languages} type="text" className="form-control" placeholder='Language Used' onChange={e=>setprojectData({...projectData,languages:e.target.value})} />
                </div>
                <div className='mb-3'>
                    <input value={projectData.github} type="text" className="form-control" placeholder='Github Link'  onChange={e=>setprojectData({...projectData,github:e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <input value={projectData.website} type="text" className="form-control" placeholder='Website Link' onChange={e=>setprojectData({...projectData,website:e.target.value})} />
                </div>
                <div className=''>
                    <input value={projectData.overview} type="text" className="form-control" placeholder='Project Overview' onChange={e=>setprojectData({...projectData,overview:e.target.value})}/>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} className='btn-success'>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
}

export default EditProject