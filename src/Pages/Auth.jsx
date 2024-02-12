import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../Services/allAPIs";
import { tokenAuthenticationContext } from "../Context API/TokenAuth";


function Auth({ insideRegister }) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning("Please complete the form");
    } else {
      //toast.success("proceeded to api call")
      try {
        const result = await registerAPI(userData);
        console.log(result);
        if (result.status === 200) {
          toast.success(`${result.data.username} has registered succesfully`)
          setUserData({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        } else {
          toast.warning(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleLogin = async(e)=>{
    e.preventDefault()
    const {  email, password } = userData;
    if ( !email || !password) {
      toast.warning("Please complete the form");
    } else {
      //toast.success("proceeded to api call")
      try {
        const result = await loginAPI(userData);
        console.log(result);
        if (result.status === 200) {
          sessionStorage.setItem("username",result.data.existingUser.username)
          sessionStorage.setItem("token", result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
          setIsAuthorised(true)
          setUserData({email: "", password: "" })
         navigate("/")
        } else {
          toast.warning(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }

  }
  console.log(userData.username, userData.email, userData.password);
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <Link className="btn btn-success mb-3" to={"/"}>
          <i class="fa-solid fa-arrow-left me-2"></i>Back to home
        </Link>
        <div
          style={{ boxShadow:'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'  }}
          className="card p-5"
        >
          <ToastContainer
            autoClose={4000}
            theme="colored"
            position="top-center"
          />
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                className="w-100"
                src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?w=740&t=st=1704968999~exp=1704969599~hmac=3f30ee5c880042c79a43acf74c8c92a0a37e9f8c1314546302f8026945ce909d"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <div className="d-flex  align-items-center flex-column">
                <h1
                  style={{ fontSize: "35px" }}
                  className="ms-5 text-center mb-3"
                >
                  <i class="fa-solid fa-laptop-code me-2 mt-5"></i>PROJECT FAIR
                </h1>
                <h5 className="fw-bolder mt-2 pb-3 ">
                  {insideRegister
                    ? `Sign up your Account`
                    : `Sign in your Account`}
                </h5>
                <Form>
                  {insideRegister && (
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        onChange={(e) =>
                          setUserData({ ...userData, username: e.target.value })
                        }
                        value={userData.username}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      value={userData.email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      value={userData.password}
                    />
                  </Form.Group>
                  {insideRegister ? (
                    <div>
                      <button
                        onClick={handleRegister}
                        className="btn btn-light mb-2 shadow border"
                      >
                        Register
                      </button>
                      <p>
                        Already have an Account? Click here{" "}
                        <Link className="btn btn-warning" to={"/login"}>
                          Login
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button onClick={handleLogin} className="btn btn-light mb-2 shadow border">
                        Login
                      </button>
                      <p>
                        New user? Click here{" "}
                        <Link className="btn btn-warning" to={"/register"}>
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
