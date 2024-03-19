import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Headers from "../Utils/Headers";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Box, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

function UpdateUser() {
  const { id } = useParams();
  const user_name = useRef(HTMLInputElement);
  const user_id = useRef(HTMLInputElement);
  const email = useRef(HTMLInputElement);
  const roles = useRef(HTMLInputElement);
  const [Email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const isActive = useRef(HTMLInputElement);
  const [roleList, setRoleList] = useState([]);
  const [roleMaster, setRoleMaster] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [usernameErr, setUserNameErr] = useState("");
  const [useridErr, setUserIdErr] = useState("");
  const [rolesErr, setRolesErr] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user_data = JSON.parse(
    window.sessionStorage.getItem("user_data"),
  );

  const logged_user = user_data.name;
  useEffect(() => {
    let isApiSubscribed = true;
    const getRoles = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/role/all`,
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

  async function update(e) {
    e.preventDefault();
    console.log(logged_user);
    // console.log(user_id.current.value)
    if (
      logged_user === user_name.current.value &&
      isActive.current.checked === false
    ) {
      // if (!user_name.current.value) {
      //   return setUserNameErr("Please Enter User Name");
      // }
      // if (user_name.current.value.length > 20) {
      //   return setUserIdErr(
      //     "User Name should not contain more than 20 characters",
      //   );
      // }

      console.log(roleMaster);
      const result = fetch(
        `http://localhost:8080/updateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user_name.current.value,
            // user_id: user_id.current.value,
            email: Email,
            role_id: roleMaster,
            is_active: isActive.current.checked,
            updated_by: logged_user,
          }),
        },
      );

      setEmailErr("");
      setRolesErr("");
      setUserIdErr("");
      setUserNameErr("");

      if (!Email) {
        return setEmailErr("Please Enter Email");
      }
      // if (!user_id.current.value) {
      //   return setUserIdErr("Please Enter User ID");
      // }

      // if (user_id.current.value.length > 20) {
      //   return setUserIdErr(
      //     "User ID should not contain more than 20 characters",
      //   );
      // }
      if (!roles.current.value) {
        return setRolesErr("Please Enter Roles");
      }

      if ((await result).status === 404) {
        setEmailErr("Please Enter Email");
        setUserIdErr("please Enter User ID");
        setUserNameErr("Please Enter User Name");
        setRolesErr("Please Enter Roles");
      }
      if ((await result).status === 405) {
        setEmailErr("Enter Valid Zensar Email");
      }
      if ((await result).status === 500) {
        return toast.error("Server Trashed", {
          autoClose: 1000,
        });
      }
      // if ((await result).status === 200) {
      //   toast.success("Successfully Updated the User", {
      //     autoClose: 1000,
      //   });
      //   navigate("/user");
      // }
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
      navigate("/login");
    } else {
      e.preventDefault();
      setEmailErr("");
      setRolesErr("");
      setUserIdErr("");
      setUserNameErr("");
      if (!Email) {
        return setEmailErr("Please Enter Email");
      }
      if (!user_id.current.value) {
        return setUserIdErr("Please Enter User ID");
      }

      if (user_id.current.value.length > 20) {
        return setUserIdErr(
          "User ID should not contain more than 20 characters",
        );
      }
      // if (!user_name.current.value) {
      //   return setUserNameErr("Please Enter User Name");
      // }
      // if (user_name.current.value.length > 20) {
      //   return setUserIdErr(
      //     "User Name should not contain more than 20 characters",
      //   );
      // }
      if (!roles.current.value) {
        return setRolesErr("Please Enter Roles");
      }
      console.log(roleMaster);
      const result = fetch(
        `http://localhost:8080/updateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user_name.current.value,
            user_id: user_id.current.value,
            email: Email,
            role_id: roleMaster,
            is_active: isActive.current.checked,
            updated_by: logged_user,
          }),
        },
      );

      if ((await result).status === 404) {
        setEmailErr("Please Enter Email");
        setUserIdErr("please Enter User ID");
        setUserNameErr("Please Enter User Name");
        setRolesErr("Please Enter Roles");
      }
      if ((await result).status === 405) {
        setEmailErr("Enter Valid Zensar Email");
      }
      if ((await result).status === 500) {
        return toast.error("Server Trashed", {
          autoClose: 1000,
        });
      }
      if ((await result).status === 200) {
        toast.success("Successfully Updated the User", {
          autoClose: 1000,
        });
        navigate("/user");
      }
    }
  }

  const handleUserNameChange = (e) => {
    if (!user_name.current.value) {
      return setUserNameErr("Please Enter User Name");
    }

    if (user_name.current.value) {
      setUserNameErr("");
    }

    const names = String(user_name.current.value);

    let regex = /^[A-Za-z0-9 ]+$/;

    if (!regex.test(names)) {
      setUserNameErr(
        "Name can't include special characters",
      );
    } else {
      setUserNameErr("");
    }

    const name = String(user_name.current.value);

    if (name.length > 20) {
      return setUserNameErr(
        "User Name should not contain more than 20 characters",
      );
    }

    setDisabled(false);
  };
  const handleUserEmailChange = (e) => {
    //const patternCheck=new RegExp('[a-z0-9]+@[zensar]+\.[a-z]{2,3}');

    //const patternCheck=/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    setDisabled(false);

    const patternCheck = /[a-z0-9]+@[zensar]+\.[a-z]{2,3}/;

    if (!patternCheck.test(Email)) {
      setEmailErr("Please Enter Valid Zensar Email");
    }

    if (patternCheck.test(Email)) {
      setEmailErr("");
    }

    setEmail(e.target.value);
  };
  useEffect(() => {
    fetch(`http://localhost:8080/getbyid/${id}`, {
      method: "GET",

      headers: {
        "x-access-token":
          window.sessionStorage.getItem("token"),

        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((data, err) => {
        if (err) {
          console.log(err);

          return;
        }

        console.log(data);
        const temp = data.user[0];
        console.log(temp);
        user_name.current.value = temp.name;
        email.current.value = temp.email;
        setEmail(temp?.email);
        console.log(temp.roles[0].role_id);
        roles.current.value = temp.roles[0].role_id;
        setRoleMaster(temp.roles[0].role_id);
        isActive.current.checked = temp.is_active;
        console.log(roles.current.value);
      });
  }, [user_name, email, roles, isActive]);

  function handleCancel(e) {
    e.preventDefault();
    navigate("/user");
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    let text = `Are you sure you want to ${
      isActive.current.checked
        ? "enable Yourself"
        : "disable Yourself, Doing So will log you out."
    } `;
    if (logged_user === user_name.current.value) {
      setOpen(true);
      setParagraph(text);
      isActive.current.checked = !isActive.current.checked;
    } else {
      // isActive.current.checked = !isActive.current.checked;
      setDisabled(!disabled);
    }
  };
  const disable = () => {
    setDisabled(!disabled);
    isActive.current.checked = !isActive.current.checked;
    setOpen(false);
  };

  return (
    <div className='p-2'>
      <div className='App'>
        <Headers />
      </div>

      <div className='container-wrap p-3'>
        <h2 className='mb-4 '>Update User</h2>

        <form>
          <div className='row mb-3'>
            <div className='col-md-1'>
              <div className='form-group px-2'>
                <label
                  className='fw-bolder  '
                  for='first'>
                  User Id
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group'>
                <input
                  autoFocus='true'
                  id='userid'
                  type='text'
                  className={`form-control ${
                    useridErr && "add__input"
                  }`}
                  ref={user_id}
                  value={id}
                  placeholder='Enter User Id'
                  disabled
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                />

                {useridErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />

                    {useridErr}
                  </p>
                )}
              </div>
            </div>

            <div className='col-sm-1'></div>

            <div className='col-md-1'>
              <div className='form-group px-2'>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  User Name
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  className={`form-control ${
                    usernameErr && "add__input"
                  }`}
                  placeholder='Enter User Name'
                  ref={user_name}
                  onChange={handleUserNameChange}
                />

                {usernameErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />

                    {usernameErr}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-1 '>
              <div className='form-group px-2'>
                <label
                  className='fw-bolder'
                  for='first'>
                  Email
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  className={`form-control ${
                    emailErr && "add__input"
                  }`}
                  value={Email}
                  placeholder='Enter Email Id'
                  onChange={handleUserEmailChange}
                />

                {emailErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />

                    {emailErr}
                  </p>
                )}
              </div>
            </div>

            <div className='col-sm-1'></div>

            <div className='col-md-1'>
              <div className='form-group px-2'>
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
                  value={roleMaster}
                  onChange={(e) => {
                    setRoleMaster(e.target.value);
                    setDisabled(false);
                  }}
                  id='select'
                  className={`form-control ${
                    rolesErr && "add__input"
                  }`}
                  aria-label='Select Role'>
                  <option
                    value=''
                    data-testid='selectRole'>
                    Select Role
                  </option>

                  {roleList?.role &&
                    roleList?.role.map(
                      (role) =>
                        role?.is_deleted && (
                          <option value={role.role_id}>
                            {role.role_name}
                          </option>
                        ),
                    )}
                </select>

                {rolesErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />

                    {rolesErr}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* <div className='row g-3'>
            <div className='col-sm-1 '>
              <label className='fw-bolder px-2 py-1'>
                isActive
              </label>
            </div>
            &nbsp;&nbsp;
            <div className='col-sm-3 form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                ref={isActive}
                onChange={(e) => {
                  setDisabled(false);
                }}
                disabled={
                  logged_user === user_name.current.value
                }
                id='flexSwitchCheckDefault'
                data-testid='checkbox'
              />
            </div>
          </div>

          <div className='py-3 '>
            &nbsp;
            <button
              onClick={update}
              className='btn btn-primary'
              type='button'
              disabled={disabled}
              data-testid='update'>
              Update
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              onClick={handleCancel}
              className='btn btn-primary'
              type='button'
              data-testid='button'>
              Cancel
            </button>
          </div> */}
          <div className='row '>
            <div className='col-md-1 '>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  for='first'>
                  isActive
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <div className='form-check form-switch form-switch-md'>
                  <input
                    className='form-check-input'
                    onChange={handleOpen}
                    type='checkbox'
                    data-testid='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    // disabled={
                    //   logged_user ===
                    //   user_name.current.value
                    // }
                    // onChange={(e)=>{
                    //   setDisabled(false);
                    // }}
                    ref={isActive}></input>
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box sx={style}>
              <Typography
                id='modal-modal-title'
                variant='h4'
                component='h2'>
                <p>{paragraph}</p>
              </Typography>
              <div className='addModal__btn'>
                <div className=''>
                  <button
                    type='submit'
                    className=''
                    onClick={disable}>
                    Ok
                  </button>
                </div>
                <div className=''>
                  <button
                    onClick={handleClose}
                    className='btn btn-danger'>
                    Cancel
                  </button>
                </div>
              </div>
            </Box>
          </Modal>

          <div className='row addList__button'>
            <div className='col-md-2'>
              <button
                type='submit'
                disabled={disabled}
                onClick={update}
                className='btn btn-primary'
                data-testid='submit'>
                Update
              </button>
            </div>

            <div className='col-md-3'>
              <button
                onClick={handleCancel}
                className='btn btn-primary'
                type='button'
                data-testid='button'>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
