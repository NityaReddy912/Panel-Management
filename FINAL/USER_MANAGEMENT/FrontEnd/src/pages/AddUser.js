import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import Navbar from "../components/navbar"
function AddUser() {
  const [username, setUserName] = useState("");
  const [userid, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    setUserName("");
    setEmail("");
    setUserId("");
    setRoles("");
    setIsActive(false);
    navigate("/search");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      roles,
      userid,
      email,
      isActive,
    };
    console.log(user);
    const result = await fetch("http://localhost:8080/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "User_ID": userid,
        "User_Name": username,
        "Email": email,
        "Roles": roles,
        "Action": isActive
      })
    })
    const data = await result.json();
    if (result.status === 404) {
      return toast.error("Please Enter All Fields",{autoClose:1000});
    }
    if (result.status === 409) {
      return toast.error("User Already Exists",{autoClose:1000});
    }
    if (result.status === 500) {
      return toast.error("Server Trashed",{autoClose:1000});
    }
    if (result.status === 200) {
      toast.success("Successfully Added New User",{autoClose:1000});
      navigate("/search");
    }
  };

  return (
    <div className="p-2">
    <div className="App">
      <Navbar/>
    </div>
    <div className="container-wrap p-3">
      <h2 className="mb-4 " data-testid="AddUser">Add User</h2>
      <form>
        <div className="row mb-3">
          <div className="col-md-1">
            <div className="form-group px-2">
              <label className="fw-bolder  " htmlFor="first">
                User Id
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User Id"
              />
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-md-1">
            <div className="form-group">
              <label className="fw-bolder " htmlFor="first">
                User Name
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Enter User Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-1 ">
            <div className="form-group px-2">
              <label className="fw-bolder" htmlFor="first">
                Email
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group ">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Id"
              />
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-md-1">
            <div className="form-group">
              <label className="fw-bolder" htmlFor="first">
                User Role
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <select onChange={(e) => setRoles(e.target.value)} id="select" className="form-select" aria-label="Select Role">
                <option value="" data-testid="selectRole" >Select Role</option>
                <option value="Practice Head(PH)">Practice Head(PH)</option>
                <option value="Talent Acquisition(TA)">Talent Acquisition(TA)</option>
                <option value="Panel(Interviewer)">Panel(Interviewer)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row g-3" >
          <div className="col-sm-1 ">
            <label className="fw-bolder px-2 py-1">isActive</label>
          </div>
          &nbsp;&nbsp;
          <div className="col-sm-3 form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
              data-testid="checkbox"
              value={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>


        </div>
        <div className="row addList__button">
          <div className="col-md-2">
            <button type='submit' onClick={handleSubmit} className="btn btn-primary" data-testid="submit">
              Submit
            </button>
          </div>
          <div className='col-md-3'>
            <button onClick={handleCancel} className="btn btn-primary" type="button" data-testid="button">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddUser;
