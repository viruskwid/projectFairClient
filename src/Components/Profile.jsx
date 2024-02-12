import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import uploadProfile from '../assets/images/uploadimage.png'
import { SERVER_URL } from '../Services/ServerUrl';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateUserProfileAPI } from '../Services/allAPIs';

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedin:"",profileImage:""
  })
  const [existingImage,setExistingImage]=useState("")
  const [preview,setPreview]=useState("")
  useEffect(()=>{
   if (sessionStorage.getItem("user")) {
      const userDetails = JSON.parse(sessionStorage.getItem("user"))
      setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedin:userDetails.linkedin,profileImage:""})
      setExistingImage(userDetails.profile)
   }
  },[open])

  useEffect(()=>{
   if (userData.profileImage) {
    setPreview(URL.createObjectURL(userData.profileImage))
   }else{
    setPreview("")
   }
  },[userData.profileImage])
  console.log(userData);

  const handleProfileUpdate = async()=>{
   const {username,email,password,github,linkedin,profileImage} = userData
   if (!github || !linkedin) {
    toast.warn("please fill the fields Completely")
    
   }else{
    //proceed to api call
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("password",password)
    reqBody.append("email",email)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)
  const token = sessionStorage.getItem("token")
  if (token) {
    const reqHeader={
      "Content-Type":preview?"multipart/form-data":"application/json",
      "Authorization":`Bearer ${token}`
    }
    //api call
    try{
      const result = await UpdateUserProfileAPI(reqBody,reqHeader)
      if (result.status==200) {
        setOpen(!open)
        sessionStorage.setItem("user" ,JSON.stringify(result.data))
      }else{
        console.log(result);
      }
    }catch(err){
         console.log(err);
    }
  }

   }
  }
  return (
    <>
    <div className="d-flex rounded p-2 justify-content-between">
      <h3>Profile</h3>
      <button onClick={() => setOpen(!open)}  aria-expanded={open} className='btn btn-outline-warning'><i className='fa-solid fa-chevron-down'></i></button>
    </div>
    <Collapse in={open}>
        <div id="example-collapse-text">
        <div className="d-flex flex-column shadow card p-3 justify-content-center mt-3" id='example-collapse-text'>
         <label className='text-center'> 
         <input onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})} style={{display:'none'}} type='file' />
         {existingImage==""?<img className='rounded-circle' width={'200px'} height={'200px'} src={preview?preview:uploadProfile} alt="upload image" />:<img className='rounded-circle' width={'200px'} height={'200px'} src={preview?preview: `${SERVER_URL}/uploads/${existingImage}`} alt="upload image" />}
         </label>
         <div  className='mb-2 mb-2 d-flex'>
         <i style={{ height: '40px', fontSize:'25px', width:'10%' }} class="fa-brands fa-github fa-2x mt-2"></i>
         <input onChange={e=>setUserData({...userData,github:e.target.value})} type="text" className='form-control ms-2' placeholder='Enter GitHub link' value={userData.github}  />
         </div>
         <div className='mt-2 mb-2 d-flex'>
         <i style={{ height: '40px' , fontSize:'25px' , width:'10%' }} class="fa-brands fa-linkedin fa-2x mt-2"></i>
         <input value={userData.linkedin}  onChange={e=>setUserData({...userData,linkedin:e.target.value})} type="text" className='form-control ms-2' placeholder='Enter LinkedIn link'  />
         </div>
         <div className='text-center mt-2 mb-2 '>
          <button onClick={handleProfileUpdate} className='btn btn-warning'>Upload</button>
         </div>
        </div>
        </div>
      </Collapse>
      <ToastContainer
            autoClose={4000}
            theme="colored"
            position="top-center"
          />
    </>
  )
}

export default Profile