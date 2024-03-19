import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  logout,
  selectUser,
} from "../../features/userSlice";
import "./Header.css";

function Headers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const userData = useSelector(selectUser);
  const [role, setRole] = useState("");
  console.log(role);

  useEffect(() => {
    let isApiSubscribed = true;
    const user_data = JSON.parse(
      window.sessionStorage.getItem("user_data"),
    );
    setUser(
      <div>
        <p
          style={{
            fontSize: "15px",
            marginBottom: "0px",
          }}>
          {user_data.name}
        </p>
        <p
          style={{
            fontSize: "10px",
            marginBottom: "0px",
            textTransform: "capitalize",
          }}>
          {role}
        </p>
      </div>,
    );

    if (userData) {
      const getRoleList = async () => {
        const roleListResponse = await fetch(
          `http://localhost:5000/role/role-id/${userData?.role_id}`,
          {
            headers: {
              "x-access-token":
                window.sessionStorage.getItem("token"),
            },
          },
        );

        const roleListData = await roleListResponse.json();
        console.log(roleListData);

        setRole(roleListData?.role_name);
      };

      if (isApiSubscribed) {
        getRoleList();
      }
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [role, userData]);

  function handleLogout() {
    const user_id = JSON.parse(
      window.sessionStorage.getItem("user_data"),
    ).user_id;
    fetch("http://localhost:8080/logout", {
      method: "PUT",
      headers: {
        "x-access-token":
          window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
    // window.sessionStorage.setItem('user_data', '');
    toast.success("Successfully Logged Out", {
      autoClose: 1000,
    });

    sessionStorage.removeItem("token");

    dispatch(logout());

    // window.sessionStorage.setItem('token', '')
    navigate("/");
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary rounded'>
      <div className='container-fluid'>
        <Link
          to='/'
          className='navbar-brand fw-bolder'>
          Panel Management
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {userData?.role_id === 1001 && (
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link dropdown-toggle active'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <u>Master</u>
                </Link>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='navbarDropdown'>
                  <li className='nav-item'>
                    <NavLink
                      to='/role'
                      className='dropdown-item'
                      aria-current='page'>
                      Roles
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/panel-type'
                      className='dropdown-item'
                      aria-current='page'>
                      Candidate Role
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/panel-level'
                      className='dropdown-item'
                      aria-current='page'>
                      Panel Level
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/grade'
                      className='dropdown-item'
                      aria-current='page'>
                      Grade
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/candidate-status'
                      className='dropdown-item'
                      aria-current='page'>
                      Candidate Status
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className='nav-item'>
              <NavLink
                to='/user'
                className={`nav-link `}>
                User
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/candidate'
                className='nav-link'
                aria-current='page'>
                Candidate
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/interview-list'
                className='nav-link'
                aria-current='page'>
                Interview List
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/panelList'
                className='nav-link'
                aria-current='page'>
                Panel List
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/panelavailbility'
                className='nav-link'
                aria-current='page'>
                Panel Availbility
              </NavLink>
            </li>
            {/* <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle active'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <u>Talent Acquisition</u>
              </Link>
              <ul
                className='dropdown-menu'
                aria-labelledby='navbarDropdown'>
                <li className='nav-item'>
                  <NavLink
                    to='/candidate'
                    className='dropdown-item'
                    aria-current='page'>
                    Candidate
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to='/interview-list'
                    className='dropdown-item'
                    aria-current='page'>
                    Interview List
                  </NavLink>
                </li>
              </ul>
            </li> */}
            {/* <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle active'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <u>Panel</u>
              </Link>
              <ul
                className='dropdown-menu'
                aria-labelledby='navbarDropdown'>
                <li className='nav-item'>
                  <NavLink
                    to='/panelList'
                    className='dropdown-item'
                    aria-current='page'>
                    Panel List
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to='/panelavailbility'
                    className='dropdown-item'
                    aria-current='page'>
                    Panel Availbility
                  </NavLink>
                </li>
              </ul>
            </li> */}
          </ul>
          <div className='dropdown header__dropdown'>
            <button
              className='nav-item dropdown-toggle header__button'
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <span className='d-flex'>
                <span className='profile'>
                  <i className='bi bi-person'></i>
                </span>
                <span className='profile-text dropdown'>
                  {user}
                </span>
              </span>
            </button>
            <ul
              className='dropdown-menu'
              aria-labelledby='dropdownMenuButton1'>
              <li>
                <Link
                  className='dropdown-item'
                  to='/reset'>
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  className='dropdown-item'
                  to='/'
                  onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Headers;
