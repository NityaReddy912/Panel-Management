import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from 'react-bootstrap-icons';

function SingleList({ hash, role }) {
  const [id, setId] = useState();
  const [check, setCheck] = useState(role?.is_active);

  useEffect(() => {
    setId(role.panel_availability_id)
  }, [role]);

  const handleUpdateToggle = async (e) => {
    try {
      const responseToggle = await fetch(
        `http://localhost:8000/panelavail/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: role.is_active,
          }),
        },
      );

      if (responseToggle.status === 200) {
        setCheck(!check);
      }

      if (responseToggle.status === 500) {
        alert("Errr");
      }

      const toggle = await responseToggle.json();
      console.log(toggle);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(update);
  return (
    <tr className={!check ? "table-inactive" : ""}>
      <th scope='row'>{hash}</th>
      <td>{role.user_id}</td>
      <td>{role.name}</td>
      <td>{role.email}</td>
      <td>{role.contact}</td>
      <td>{role.role_name}</td>
      <td>{role.type}</td>
      <td>{role.available_from_date.split("T")[0]}</td>
      <td>
        {role.start_time} - {role.end_time}
      </td>
      <td>{role.availability_status}</td>

      <td>
        <Link to={`/UpdatePanel/${role.user_id}/${role.name}/${role.available_from_date.split("T")[0]}/${role.grade}`}>
       <Pencil />
      </Link>
        {/**/}
        {/* this should be inside link but as routing is not applied, I have kept this out */}
        <span
          className='bar'
          style={{ marginLeft: "10px" }}>
          |
        </span>
        <span
          className='form-check form-switch form-switch-md'
          style={{
            display: "inline-block",
            marginLeft: "10px",
          }}>
          <input
            data-testid='search-check'
            className='form-check-input'
            type='checkbox'
            id='flexSwitchCheckDefault'
            onChange={handleUpdateToggle}
            value={check}
            checked={check}
          />
        </span>
      </td>
    </tr>
  );
}

export default SingleList;
