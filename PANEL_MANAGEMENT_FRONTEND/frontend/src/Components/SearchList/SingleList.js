import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";

function SingleList({
  hash,
  role,
  filterName,
  page,
  onDeleteBy,
}) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [check, setCheck] = useState(role?.is_deleted);
  const [update, setUpdate] = useState();
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const [disabled, setDisabled] = useState(true);
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

  useEffect(() => {
    switch (filterName) {
      case "role":
        setId(role.role_id);
        setName(role.role_name);
        setUpdate("role");
        break;
      case "candidate role":
        setId(role.candidate_role_id);
        setName(role.candidate_roles);
        setUpdate("panel-type");
        break;
      case "panel level":
        setId(role.panel_level_id);
        setName(role.panel_level);
        setUpdate("panel-level");
        break;
      case "grade":
        setId(role.grade_id);
        setName(role.grade);
        setUpdate("grade");
        break;
      case "candidate status":
        setId(role.candidate_status_id);
        setName(role.candidate_status);
        setUpdate("candidate-status");
        break;

      default:
        break;
    }
  }, [filterName, role]);

  const handleDeleteBy = (toggle) => {
    const newDeleteBy = {
      err,
    };

    console.log(toggle);

    onDeleteBy(toggle);
  };

  const handleUpdateChange = () => {
    setCheck(!check);
  };

  const handleUpdateToggle = async (e) => {
    try {
      const responseToggle = await fetch(
        `http://localhost:5000/${update}/isAction/${id}`,
        {
          method: "PUT",
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        },
      );

      const toggle = await responseToggle.json();
      console.log(toggle);

      if (responseToggle.status === 200) {
        setOpen(false);
        setCheck(!check);
      }

      if (responseToggle.status === 400) {
        alert(toggle.err);
        handleDeleteBy(toggle);
        setErr(toggle);
      }

      if (responseToggle.status === 500) {
        alert("Errr");
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(role?.is_deleted);
  const handleOpen = () => {
    if (filterName !== "role") {
      return;
    }
    setOpen(true);
    if (name === "practice head") {
      setParagraph("You cannot Disable Practice Head!!!");
    } else {
      setParagraph(
        `Are you sure you want to ${
          check ? "Disable" : "Enable"
        } this Role`,
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(role);
  return (
    <>
      <tr
        className={!check ? "table-inactive" : ""}
        style={{
          textTransform: "capitalize",
        }}>
        <th scope='row'>{hash}</th>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          <Link to={`/${update}/update/${role?._id}`}>
            <i className='bi bi-pen'></i>
          </Link>
          <span className='bar'>|</span>
          <span
            className='form-check form-switch form-switch-md'
            style={{ display: "inline-block" }}
            onClick={handleOpen}>
            <input
              data-testid='search-check'
              className='form-check-input'
              type='checkbox'
              onChange={
                filterName !== "role" && handleUpdateToggle
              }
              disabled={name === "practice head" && true}
              id='flexSwitchCheckDefault'
              value={check}
              checked={check}
            />
          </span>
        </td>
      </tr>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h4'
            style={{
              textTransform: "none",
            }}
            component='h2'>
            <p>{paragraph}</p>
          </Typography>
          <div className='addModal__btn'>
            {
              <div className=''>
                <button
                  type='submit'
                  onClick={handleUpdateToggle}
                  style={{
                    width: "130px",
                  }}
                  disabled={name === "practice head"}
                  className=''>
                  Ok
                </button>
              </div>
            }
            <div className=''>
              <button
                onClick={handleClose}
                style={{
                  color: "white",
                }}
                className='btn btn-danger'>
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default SingleList;
