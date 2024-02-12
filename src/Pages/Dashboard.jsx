import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProject from '../Components/MyProject'
import Profile from '../Components/Profile'
function Dashboard() {
  const[username , setUsername]=useState("")
  useEffect(()=>{
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    }
  },[])
  return (
    <>
    <Header insideDashboard/>
    <div style={{marginTop:'60px'}} className="dashboard container">
      <h1 className='fw-bolder'>Welcome <span className='text-warning'>{username?.split(" ")[0]}</span></h1>
      <div className="row mt-5">
        <div className="col-lg-8">
          <MyProject/>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard