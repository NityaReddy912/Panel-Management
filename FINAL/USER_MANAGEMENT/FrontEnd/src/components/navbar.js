import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginPage from "./login_page/login";
import "../components/navbar.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from "react-toastify";

function Navbar() {
  const [user,setUser] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const user_data = (JSON.parse(window.sessionStorage.getItem('user_data')));
    setUser(<div><p style={{fontSize:"15px",marginBottom:"0px"}}>{user_data.User_Name}</p><p style={{fontSize:"10px", marginBottom:"0px"}}>{user_data.Roles}</p></div>)
    
  }, []);

  return (
    <div className="wrapper  py-2 px-2">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">
        <div className="container-fluid">
          <Link to="/search" className="navbar-brand fw-bolder">
            User Management
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/search" className="nav-link active" aria-current="page">
                  User
                </Link>
              </li>
            </ul>
          
            <Dropdown>

              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <b>{user}</b>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="\reset">Change Password</Dropdown.Item>
                <Dropdown.Item href="#" onClick={()=>{window.sessionStorage.setItem('user_data', '');toast.success("Successfully Logged Out", { autoClose: 1000 });navigate('/')}}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
