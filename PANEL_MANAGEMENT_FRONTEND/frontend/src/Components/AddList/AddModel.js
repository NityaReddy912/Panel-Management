import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";

function AddModel({ handleClose, open, filterName }) {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [err, setErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [idErr, setIdErr] = useState("");
  const [cancel, setCancel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    switch (filterName) {
      case "role":
        setCancel("role");
        break;
      case "panel type":
        setCancel("panel-type");
        break;
      case "panel level":
        setCancel("panel-level");

        break;
      case "grade":
        setCancel("grade");

        break;
      case "candidate status":
        setCancel("candidate-status");

        break;

      default:
        break;
    }
  }, [filterName]);

  const handleChangeRoleId = (e) => {
    setRoleId(e.target.value);
  };

  const handleChangeRoleName = (e) => {
    setNameErr(false);
    setRoleName(e.target.value);
  };

  const handleCancel = () => {
    navigate(`/${cancel}`);
  };

  const handleSubmitAddList = async (e) => {
    e.preventDefault();
    setErr("");
    setIdErr("");
    setNameErr("");
    console.log("hi");

    if (!roleName) {
      setErr("Please Enter all details");
      setNameErr("Please Enter Name");
      return;
    }

    let newRole;
    let fetchName;

    switch (filterName) {
      case "role":
        fetchName = "role";
        newRole = {
          role_name: roleName,
        };
        setCancel("role");
        break;
      case "candidate role":
        fetchName = "candidate-role";
        newRole = {
          candidate_role_id: roleId,
          candidate_roles: roleName,
        };
        setCancel("candidate-role");
        break;
      case "panel level":
        fetchName = "panel-level";
        newRole = {
          panel_level_id: roleId,
          panel_level: roleName,
        };
        setCancel("panel-level");

        break;
      case "grade":
        fetchName = "grade";
        newRole = {
          grade_id: roleId,
          grade: roleName,
        };
        setCancel("grade");

        break;
      case "candidate status":
        fetchName = "candidate-status";
        newRole = {
          candidate_status_id: roleId,
          candidate_status: roleName,
        };
        setCancel("candidate-status");

        break;

      default:
        break;
    }

    const newRoleResponse = await fetch(
      `http://localhost:5000/${fetchName}/`,
      {
        method: "POST",
        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      },
    );

    console.log(newRoleResponse);
    const newRoleData = await newRoleResponse.json();
    console.log(newRoleData);

    if (newRoleResponse.status === 404) {
      return setNameErr(newRoleData.err);
    }
    console.log(newRoleData, newRoleResponse);
    if (newRoleResponse.status === 500) {
      return setErr("Something went wrong in Server");
    }
    setRoleId("");
    setRoleName("");
    if (newRoleResponse.status === 200) {
      return toast.success("Successfully Add New Role", {
        autoClose: 1000,
      });
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
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
          Add {filterName}
        </Typography>
        <form
          className=''
          onSubmit={handleSubmitAddList}>
          <div className=''>
            <div className='mt-2'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  {filterName} Name
                </label>
              </div>{" "}
            </div>
            <div className=''>
              <div className=''>
                <input
                  type='text'
                  autoFocus
                  className={`form-control mt-2 ${
                    nameErr && "search__input"
                  }`}
                  value={roleName}
                  onChange={handleChangeRoleName}
                  placeholder={`Enter ${filterName} Name`}
                  id='roleName'
                />
                {nameErr && (
                  <p
                    className={`search__warning ${
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

          <div className='addModal__btn'>
            <div className=''>
              <button
                type='submit'
                className=''>
                Submit
              </button>
            </div>
            <div className=''>
              <button
                onClick={handleClose}
                className=''>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default AddModel;
