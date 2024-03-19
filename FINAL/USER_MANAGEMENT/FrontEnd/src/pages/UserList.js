import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom'
import "./UserList.scss";
import SearchList from "./SearchList.js"
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';

function UserList() {
  const navigate=useNavigate();
  const username = useRef(HTMLInputElement);
  const userid = useRef(HTMLInputElement);
  const email = useRef(HTMLInputElement);
  const roles = useRef(HTMLInputElement);
  const isActive = useRef(HTMLInputElement);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const user_data = JSON.parse(window.sessionStorage.getItem('user_data'));

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  const onNext = () => {
    setPage(page + 1);
  };
  const onPrevious = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  function handleSearch(e){
    e.preventDefault();
    setPage(1);
    search({preventDefault:()=>{}});
  }
  useEffect(()=>{
    search({preventDefault:()=>{}});
  }, [page]);
  
  async function search(e) {
    e.preventDefault();
    setShow(true);
    const request = await fetch(`http://localhost:8080/search/${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User_Name: username.current.value,
        User_ID: userid.current.value,
        Email: email.current.value,
        Roles: roles.current.value,
        Action: isActive.current.checked
      })
    })
    const data = await request.json();
    setUserList(data);
  }

  return (
    <div className="p-2">
    <div className="App">
      <Navbar/>
    </div>
    <div className="container-wrap px-3">
      <div className='row' >
        <div className='col-md-12 '>
          <h2 >User List
            <Link to='/add'>
              <button type='submit' disabled={!(user_data.Roles === "Practice Head(PH)")} className='btn btn-primary float-end '>+Add User</button>
            </Link></h2>
        </div>
      </div>
      <div className="container-wrap">
        <form>
          <div className="row mb-3">
            <div className="col-md-1">
              <div className="form-group">
                <label className="fw-bolder  " for="userid">
                  User Id
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input type="text"
                  className="form-control"
                  id="userid"
                  ref={userid}
                  placeholder="Enter User Id"
                />
              </div>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-md-1">
              <div className="form-group">
                <label className="fw-bolder " for="username">
                  UserName
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User Name"
                  id="username"
                  ref={username}
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-1 ">
              <div className="form-group">
                <label className="fw-bolder" for="email">
                  Email
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group ">
                <input
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
                <select id="roles" ref={roles} className="form-select" aria-label="Select Role">
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
              <label className="fw-bolder">isActive</label>
            </div>
            &nbsp;&nbsp;
            <div className="col-sm-3 form-check form-switch">
              <input className="form-check-input" type="checkbox" data-testid="checkbox" role="switch" id="isActive" ref={isActive}/>
            </div>
          </div>
          <div className="row addList__button">
            <div className="col-md-2">
              <button type='submit' onClick={handleSearch} className="btn btn-primary" data-testid="submit" value="">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {show && (
        <SearchList
          userList={userList}
          onNext={onNext}
          onPrevious={onPrevious}
          page={page}
          userid={userid}
          username={username}
          email={email}
          roles={roles}
          isActive={isActive}
        />
      )}
    </div>
    </div>
  );
}

export default UserList;