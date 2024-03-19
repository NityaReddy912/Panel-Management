import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Loading.css";

function UpdateForm({ roleList, filterName }) {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  console.log(filterName, roleList);

  useEffect(() => {
    setNameErr("");
    if (roleList) {
      switch (filterName) {
        case "role":
          setRoleId(roleList.role_id);
          setRoleName(roleList.role_name);
          setRedirectUrl("/role");
          break;
        case "panel type":
          setRoleId(roleList.panel_type_id);
          setRoleName(roleList.panel_type);
          setRedirectUrl("/panel-type");
          break;
        case "panel level":
          setRoleId(roleList.panel_level_id);
          setRoleName(roleList.panel_level);
          setRedirectUrl("/panel-level");
          break;
        case "grade":
          setRoleId(roleList.grade_id);
          setRoleName(roleList.grade);
          setRedirectUrl("/grade");
          break;
        case "candidate status":
          setRoleId(roleList.candidate_status_id);
          setRoleName(roleList.candidate_status);
          setRedirectUrl("/candidate-status");
          break;

        default:
          break;
      }
    }
  }, [roleList, filterName]);

  console.log(roleId, roleName, roleList, filterName);

  const handleUpdateList = async (e) => {
    e.preventDefault();

    setNameErr("");
    if (!roleName) {
      setNameErr("Please enter a name");
      return;
    }

    let newRole;
    let fetchName;

    switch (filterName) {
      case "role":
        fetchName = "role";
        newRole = {
          role_id: roleId,
          role_name: roleName,
        };
        break;
      case "panel type":
        fetchName = "panel-type";

        newRole = {
          panel_type_id: roleId,
          panel_type: roleName,
        };
        break;
      case "panel level":
        fetchName = "panel-level";

        newRole = {
          panel_level_id: roleId,
          panel_level: roleName,
        };
        break;
      case "grade":
        fetchName = "grade";

        newRole = {
          grade_id: roleId,
          grade: roleName,
        };
        break;
      case "candidate status":
        fetchName = "candidate-status";

        newRole = {
          candidate_status_id: roleId,
          candidate_status: roleName,
        };
        break;

      default:
        break;
    }

    if (roleList) {
      const newRoleResponse = await fetch(
        `http://localhost:5000/${fetchName}/${roleId}`,
        {
          method: "PUT",
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRole),
        },
      );

      const newRoleData = await newRoleResponse.json();

      console.log(newRoleData);

      if (newRoleResponse.status === 404) {
        return setErr(newRoleData.err);
      }
      if (newRoleResponse.status === 500) {
        return setErr("Server Trashed");
      }
      setRedirect(true);

      setTimeout(() => {
        setRedirect(false);
        navigate(`/${fetchName}`);
        setRoleId("");
        setRoleName("");
      }, 2000);
      if (newRoleResponse.status === 200) {
        return toast.success("Successfully Add New Role", {
          autoClose: 1000,
        });
      }
    }
  };

  const handleCancel = () => {
    navigate(`${redirectUrl}`);
  };

  const handleNameChange = (e) => {
    setDisabled(false);
    setNameErr(false);
    setRoleName(e.target.value);
  };

  return (
    <div className='container-wrap'>
      <h2 className='edit-header'>Edit Role Master</h2>

      {err && (
        <p className='alert alert-danger'>
          Something Went wrong
        </p>
      )}
      {redirect && (
        <div className='redirect'>
          <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      <form onSubmit={handleUpdateList}>
        <div className='row'>
          <div className='col-md-1'>
            <div className='form-group'>
              <label
                className='fw-bolder'
                htmlFor='first'>
                {filterName} Id
              </label>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='form-group'>
              <input
                type='text'
                className={`form-control ${
                  filterName === "panel level" ||
                  filterName === "panel type"
                    ? "filterNameMargin"
                    : ""
                } ${
                  filterName === "candidate status" &&
                  "filterNameMarginCS"
                }`}
                placeholder={`Enter ${filterName} Id`}
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-1'>
            <div className='form-group'>
              <label
                className='fw-bolder'
                htmlFor='first'>
                {filterName} Name
              </label>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='form-group'>
              <input
                type='text'
                className={`form-control ${
                  filterName === "panel level" ||
                  filterName === "panel type"
                    ? "filterNameMargin"
                    : ""
                } ${
                  filterName === "candidate status" &&
                  "filterNameMarginCS"
                } ${nameErr && "search__input"}`}
                placeholder={`Enter ${filterName} Name`}
                value={roleName}
                onChange={handleNameChange}
              />
              {nameErr && (
                <p
                  className={`mb-0 search__warning ${
                    filterName === "panel level" ||
                    filterName === "panel type"
                      ? "filterNameMargin"
                      : ""
                  } ${
                    filterName === "candidate status" &&
                    "filterNameMarginCS"
                  }`}>
                  <ExclamationTriangleIcon className='search__warningIcon' />
                  {nameErr}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='row btnGroup addList__button'>
          <div className='col-md-2'>
            <button
              type='submit'
              disabled={disabled}
              className='btn btn-primary'>
              Update
            </button>
          </div>
          <div className='col-md-3'>
            <button
              onClick={handleCancel}
              className='btn btn-primary btnCancel'>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
