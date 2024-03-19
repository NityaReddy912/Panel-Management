import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar"

function UpdateUser() {
  const { id } = useParams();
  const user_name = useRef(HTMLInputElement);
  const user_id = useRef(HTMLInputElement);
  const email = useRef(HTMLInputElement);
  const roles = useRef(HTMLInputElement);
  const isActive = useRef(HTMLInputElement);
  const navigate = useNavigate();

  async function update(e) {
    e.preventDefault();
    const result=fetch(`http://localhost:8080/updateUser/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        User_Name: user_name.current.value,
        User_ID: user_id.current.value,
        Email: email.current.value,
        Roles: roles.current.value,
        Action: isActive.current.checked
      })
    })
    if ((await result).status === 404) {
      return toast.error("Please Enter All Fields",{autoClose:1000});
    }
    if ((await result).status === 500) {
      return toast.error("Server Trashed",{autoClose:1000});
    }
    if ((await result).status === 200) {
      toast.success("Successfully Updated the User",{autoClose:1000});
      navigate("/search");
    }
  }
  useEffect(() => {
    fetch(`http://localhost:8080/getbyid/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    }).then(res => res.json())
      .then((data, err) => {
        if (err) {
          console.log(err);
          return;
        }
        const temp = data.usersList[0];
        user_name.current.value = temp.User_Name;
        email.current.value = temp.Email;
        roles.current.value = temp.Roles;
        isActive.current.checked = temp.Action;
      })
  }, []);

  function handleCancel(e) {
    e.preventDefault();
    navigate('/search');
  }

  return (
    <div className="p-2">
    <div className="App">
      <Navbar/>
    </div>
    <div className="container-wrap p-3">
      <h2 className="mb-4 ">Update User</h2>

      <form>
        <div className="row mb-3">
          <div className="col-md-1">
            <div className="form-group px-2">
              <label className="fw-bolder  " for="first">
                User Id
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <input
                id="userid"
                type="text"
                className="form-control"
                ref={user_id}
                value={id}
                placeholder="Enter User Id"
                disabled
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
                ref={user_name}
              />
            </div>
          </div>
        </div>
        {/* <div className="col-sm-2"></div> */}
        <div className="row mb-3">
          <div className="col-md-1 ">
            <div className="form-group px-2">
              <label className="fw-bolder" for="first">
                Email
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group ">
              <input
                type="email"
                className="form-control"
                ref={email}
                placeholder="Enter Email Id"
              />
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-md-1">
            <div className="form-group">
              <label className="fw-bolder" for="first">
                User Role
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <select ref={roles} id="select" className="form-select" aria-label="Select Role">
                <option value="" >Select Role</option>
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
              ref={isActive}
            />
          </div>
        </div>

        <div className="py-3 ">
          &nbsp;
          <button onClick={update} className="btn btn-primary" type="button" data-testid="update">
            Update
          </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={handleCancel} className="btn btn-primary" type="button" data-testid="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>

  );
}

export default UpdateUser;
