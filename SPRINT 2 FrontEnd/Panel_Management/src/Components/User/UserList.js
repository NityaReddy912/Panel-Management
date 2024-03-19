import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserList.scss";
import SearchList from "./SearchList.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Headers from "../Utils/Headers";

function UserList() {
  const navigate = useNavigate();
  const username = useRef(HTMLInputElement);
  const userid = useRef(HTMLInputElement);
  const email = useRef(HTMLInputElement);
  const roles = useRef(HTMLInputElement);
  const isActive = useRef(HTMLInputElement);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [masterRole, setMasterRole] = useState("");
  const user_data = JSON.parse(
    window.sessionStorage.getItem("user_data"),
  );
  const role_id = user_data.role_id;
  console.log(user_data);
  console.log(role_id);
  console.log(masterRole);

  useEffect(() => {
    isActive.current.checked = true;
    let isApiSubscribed = true;
    const getRoles = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/role/all-role`,
        {
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
        },
      );

      const roleListData = await roleListResponse.json();
      console.log(roleListData);

      setRoleList(roleListData);
    };

    if (isApiSubscribed) {
      getRoles();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

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
  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    search({ preventDefault: () => {} });
  }
  useEffect(() => {
    search({ preventDefault: () => {} });
  }, [page]);

  async function search(e) {
    e.preventDefault();
    setShow(true);
    console.log(masterRole);
    const request = await fetch(
      `http://localhost:8080/search/${page}`,
      {
        method: "POST",
        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username.current.value,
          user_id: userid.current.value,
          email: email.current.value,
          role_id: +masterRole,
          is_active: isActive.current.checked,
        }),
      },
    );
    const data = await request.json();
    console.log(data);
    if (data.err) {
      toast.error(data.err, { autoClose: 1000 });
      return;
    }
    setUserList(data);
  }

  async function searchaftertoggle(e) {
    e.preventDefault();
    setPage(1);
    setShow(true);
    const request = await fetch(
      `http://localhost:8080/search/${page}`,
      {
        method: "POST",
        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username.current.value,
          user_id: userid.current.value,
          email: email.current.value,
          role_id: masterRole,
          is_active: isActive.current.checked,
        }),
      },
    );
    const data = await request.json();
    console.log(data);
    if (data.err) {
      toast.error(data.err, { autoClose: 1000 });
      return;
    }
    setUserList(data);
  }

  return (
    <div className='p-2'>
      <div className='App'>
        <Headers />
      </div>
      <div className='container-wrap px-3'>
        <div className='row'>
          <div className='col-md-12 '>
            <h2>
              User List
              {role_id === 1001 && (
                <Link to='/add'>
                  <button
                    type='submit'
                    className='btn btn-primary float-end '>
                    +Add User
                  </button>
                </Link>
              )}
              {role_id !== 1001 && (
                <Link to='/add'>
                  <button
                    type='submit'
                    disabled='true'
                    className='btn btn-primary float-end '>
                    +Add User
                  </button>
                </Link>
              )}
            </h2>
          </div>
        </div>
        <div className='container-wrap'>
          <form>
            <div className='row mb-3'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder  '
                    for='userid'>
                    User ID
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='userid'
                    ref={userid}
                    placeholder='Enter User Id'
                  />
                </div>
              </div>
              <div className='col-sm-1'></div>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder '
                    for='username'>
                    User Name
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group '>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter User Name'
                    id='username'
                    ref={username}
                  />
                </div>
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col-md-1 '>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    for='email'>
                    Email
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group '>
                  <input
                    className='form-control'
                    ref={email}
                    placeholder='Enter Email Id'
                  />
                </div>
              </div>
              <div className='col-sm-1'></div>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    for='first'>
                    User Role
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <select
                    onChange={(e) =>
                      setMasterRole(e.target.value)
                    }
                    id='select'
                    className='form-select'
                    aria-label='Select Role'>
                    <option
                      value=''
                      data-testid='selectRole'>
                      Select Role
                    </option>
                    {roleList?.role &&
                      roleList?.role?.map((role) => (
                        <option value={+role.role_id}>
                          {role.role_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='row g-3'>
              <div className='col-sm-1 '>
                <label className='fw-bolder'>
                  isActive
                </label>
              </div>
              &nbsp;&nbsp;
              <div className='col-sm-3 form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  data-testid='checkbox'
                  role='switch'
                  id='isActive'
                  ref={isActive}
                />
              </div>
            </div>
            <div className='row addList__button'>
              <div className='col-md-2'>
                <button
                  type='submit'
                  onClick={handleSearch}
                  className='btn btn-primary'
                  data-testid='submit'
                  value=''>
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
            handleSearch={handleSearch}
            search={search}
          />
        )}
      </div>
    </div>
  );
}

export default UserList;
