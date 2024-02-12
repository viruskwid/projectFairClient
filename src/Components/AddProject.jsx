import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadProject from '../assets/images/fileupload.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from '../Services/allAPIs';
import { addProjectResponseContext } from '../Context API/ContextShare';
function AddProject() {
  //get context
  const {addProjectResponse , setAddProjectResponse} = useContext(addProjectResponseContext)
  const [show,setShow] = useState(false)
  const [projectData , setprojectData] = useState({
    title:"" , languages:"",overview:"",github:"",website:"",projectImages:""
  })
  const [preview , setPreview] = useState()
  const [fileStatus , settFileStatus] = useState(false)
  console.log(projectData);
  const handleClose= ()=> setShow(false)
  const handleShow = ()=> {
    setShow(true)
    setprojectData({
      title:"" , languages:"",overview:"",github:"",website:"",projectImages:""
    })
  }

  useEffect(()=>{
    if(projectData.projectImages.type=="image/png" || projectData.projectImages.type=="image/jpg" || projectData.projectImages.type=="image/jpeg" ){
          console.log("generate image url");
          setPreview(URL.createObjectURL(projectData.projectImages))
          settFileStatus(false)
    }else{
      console.log("invalid fromat");
      settFileStatus(true)
      setprojectData({...projectData,projectImages:""})
      setPreview("")
    }

  },[projectData.projectImages])

  const handleAdd = async ()=>{
    const {title , languages , overview , github , website , projectImages} = projectData

    if (!title || !languages || !overview || !github || ! website || !projectImages) {
      toast.warn("Please fill the fields")
    }else{
      //api call - reqbody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImages",projectImages)
      //api call reqHead
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call
        try {
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status===200){
            console.log(result.data);
            handleClose()
            setAddProjectResponse(result.data)
          }
          else{
            toast.warning(result.response.data)
          }
        } catch (error) {
          console.log(error);
        }
      }

    }
  }
  return (
    <>
    <button onClick={handleShow} className='btn btn-success '><i className='fa-solid fa-plus me-2'></i>Add Project</button>
    <Modal size='lg' className='text-center'
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
         <input style={{display:'none'}} type='file'  onChange={e=>setprojectData({...projectData,projectImages:e.target.files[0]})}/>
         <img style={{height:'250px'}}  className='w-100'  src={preview?preview:uploadProject} alt="upload project image" />
         </label>
          {fileStatus&&<div className='text-center text-danger   mt-2 mb-2'>
                *please upload only png,jpg,jpeg files*
           </div>}
            </div>
            <div className="col-lg-6">
            <div className='mb-3'>
                    <input type="text" className="form-control" placeholder='Project Title'  value={projectData.title} onChange={e=>setprojectData({...projectData ,title:e.target.value})}  />
               </div>
                <div className='mb-3'>
                    <input type="text" className="form-control" placeholder='Language Used' value={projectData.languages} onChange={e=>setprojectData({...projectData ,languages:e.target.value})} />
                </div>
                <div className='mb-3'>
                    <input type="text" className="form-control" placeholder='Github Link' value={projectData.github} onChange={e=>setprojectData({...projectData ,github:e.target.value})} />
                </div>
                <div className='mb-3'>
                    <input type="text" className="form-control" placeholder='Website Link' value={projectData.website} onChange={e=>setprojectData({...projectData ,website:e.target.value})} />
                </div>
                <div className=''>
                    <input type="text" className="form-control" placeholder='Project Overview' value={projectData.overview} onChange={e=>setprojectData({...projectData ,overview:e.target.value})} />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} className='btn-success'>Add</Button>
        </Modal.Footer>
      
      </Modal>
      <ToastContainer
            autoClose={4000}
            theme="colored"
            position="top-center"
          />
    </>
  )
}

export default AddProject