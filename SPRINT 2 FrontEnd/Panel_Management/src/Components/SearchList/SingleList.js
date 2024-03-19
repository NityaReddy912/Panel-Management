import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    switch (filterName) {
      case "role":
        setId(role.role_id);
        setName(role.role_name);
        setUpdate("role");
        break;
      case "panel type":
        setId(role.panel_type_id);
        setName(role.panel_type);
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
            style={{ display: "inline-block" }}>
            <input
              data-testid='search-check'
              className='form-check-input'
              type='checkbox'
              disabled={name === "practice head" && true}
              id='flexSwitchCheckDefault'
              onChange={handleUpdateToggle}
              value={check}
              checked={check}
            />
          </span>
        </td>
      </tr>
    </>
  );
}

export default SingleList;
