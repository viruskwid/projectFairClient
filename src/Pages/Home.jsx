import React, { useEffect, useState } from "react";
import landingImg from "../assets/images/designer.svg";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHomeProjectAPI } from "../Services/allAPIs";

function Home() {
  const navigate= useNavigate()
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [allProjects , setAllProjects] =useState([])

  const getHomeProjects = async()=>{
    const result = await getHomeProjectAPI()
    if (result.status===200) {
     setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }
  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])
  const handleProjectPage = ()=>{
       if (sessionStorage.getItem("token")) {
        navigate('/projects')
       }else{
      toast.warning("please login to explore our projects!!!")
       }
  }
  console.log(allProjects);
  return (
    <>
      <div style={{ width: "100%", height: "100vh" }} className="rounded">
        <div style={{ height: "100%" }} className="row align-items-center">
          <div className="col-lg-5 p-5">
            <h1 style={{ fontSize: "35px" }} className="ms-5 text-center mb-3">
              <i class="fa-solid fa-laptop-code me-2 mt-5"></i>PROJECT FAIR
            </h1>
            <p className="text-center">
              "Unveiling innovation and creativity in every detail – my project
              speaks volumes without uttering a word. Welcome to a journey of
              ingenuity and passion! #ProjectShowcase #InnovationUnleashed"
            </p>
         { isLoggedIn?<Link
              style={{ marginLeft: "160px" }}
              className="btn btn-dark"
              to={"/dashboard"}
            >
              Manage Projects<i class="fa-solid fa-arrow-right-long ms-2"></i>
            </Link> : <Link
              style={{ marginLeft: "160px" }}
              className="btn btn-dark"
              to={"/login"}
            >
              Explore<i class="fa-solid fa-arrow-right-long ms-2"></i>
            </Link>}
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-4">
            <img
              style={{ marginTop: "100px", height: "400px", width: "500px" }}
              className="w-100 img-fluid"
              src={landingImg}
              alt=""
            />
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <div className="projects mt-5">
        <h2 className="text-center mb-5 mt-2">Explore our projects</h2>
        <marquee>
          <div className="d-flex justify-content-between">
             {allProjects.length>0? allProjects.map(project=>(
              <div  className="shadow ">
              <ProjectCard project={project}/>
            </div>
             )):null}
          </div>
        </marquee>
        <div className="text-center">
          <button onClick={handleProjectPage} className="btn btn-dark">View more projects</button>
        </div>
      </div>
      <ToastContainer
            autoClose={4000}
            theme="colored"
            position="top-center"
          />
    </>
  );
}

export default Home;
