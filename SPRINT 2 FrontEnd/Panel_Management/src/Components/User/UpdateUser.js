import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import Headers from "../Utils/Headers";

function UpdateUser() {
  const { id } = useParams();

  const user_name = useRef(HTMLInputElement);

  const user_id = useRef(HTMLInputElement);

  const email = useRef(HTMLInputElement);

  const roles = useRef(HTMLInputElement);

  const [role, setRole] = useState("");

  const isActive = useRef(HTMLInputElement);

  const [roleList, setRoleList] = useState([]);

  const [roleMaster, setRoleMaster] = useState("");

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

          email: email.current.value,

          role_id: roleMaster,

          is_active: isActive.current.checked,

          updated_by: logged_user,
        }),
      },
    );

    if ((await result).status === 404) {
      // return toast.error("Please Enter All Fields", {
      //   autoClose: 1000,
      // });
    }
    if ((await result).status === 403) {
      // return toast.error("Please Enter Valid Email", {
      //   autoClose: 1000,
      // });
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
    }
  }

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
                  id='userid'
                  type='text'
                  className='form-control'
                  ref={user_id}
                  value={id}
                  placeholder='Enter User Id'
                  disabled
                />
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
                  className='form-control'
                  placeholder='Enter User Name'
                  ref={user_name}
                />
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
                  className='form-control'
                  ref={email}
                  placeholder='Enter Email Id'
                />
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
                  }}
                  id='select'
                  className='form-select'
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
              </div>
            </div>
          </div>

          <div className='row g-3'>
            <div className='col-sm-1 '>
              <label className='fw-bolder px-2 py-1'>
                isActive
              </label>
            </div>
            &nbsp;&nbsp;
            <div className='col-sm-3 form-check form-switch'>
              <input
                className='form-check-input'
                disabled={
                  logged_user === user_name.current.value
                }
                type='checkbox'
                role='switch'
                ref={isActive}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
