import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import "./SingleList.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function SingleList({ hash, user, search, handleSearch }) {
  const [userid, setUserId] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [roles, setRoles] = useState();
  const [isActive, setIsActive] = useState(user?.Action);
  const userRole = useSelector(selectUser);
  const [role, setRole] = useState("");
  const user_data = JSON.parse(
    window.sessionStorage.getItem("user_data"),
  );
  const logged_user = user_data.name;

  useEffect(() => {
    let isApiSubscribed = true;

    const getRoleList = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/role/role-id/${user?.user_roles[0]?.role_id}`,
        {
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
        },
      );

      const roleListData = await roleListResponse.json();
      console.log(roleListData);

      setRoles(roleListData?.role_name);
    };

    if (isApiSubscribed) {
      getRoleList();
    }
    return () => {
      isApiSubscribed = false;
    };
  }, []);
  const handleUpdateToggle = async (e) => {
    const responseToggle = await fetch(
      `http://localhost:8080/updateIsActive/${userid}`,
      {
        method: "PUT",
        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_active: !isActive,
          updated_by: logged_user,
        }),
      },
    );
    handleSearch({ preventDefault: () => {} });
    if (responseToggle.status === 200) {
      setIsActive(!isActive);
    }

    if (responseToggle.status === 500) {
      alert("Error");
    }
    const toggle = await responseToggle.json();
    console.log(toggle);
  };

  useEffect(() => {
    let isApiSubscribed = true;
    setUserId(user?.user_id);
    setUserName(user?.name);
    setEmail(user?.email);
    setIsActive(user?.is_active);
    console.log(user);

    if (userRole) {
      console.log(user);
      const getRoleList = async () => {
        const roleListResponse = await fetch(
          `http://localhost:5000/role/role-id/${userRole.role_id}`,
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
  }, [user]);
  return (
    <>
      {
        <tr className='singleList'>
          <td>{hash}</td>
          <td>{userid}</td>
          <td>{username}</td>
          <td>{email}</td>
          <td>{roles}</td>
          <td>{isActive}</td>
          <td>
            {role === "practice head" && (
              <>
                <Link to={`/edit/${userid}`}>
                  <PencilIcon className='singleList__pencilIcon' />
                </Link>
                <span className='bar'>|</span>
                <span
                  className='form-check form-switch form-switch-sm'
                  style={{ display: "inline-block" }}>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    disabled={logged_user === username}
                    data-testid='searchCheck'
                    id='flexSwitchCheckDefault'
                    onChange={handleUpdateToggle}
                    value={isActive}
                    checked={isActive}
                  />
                </span>
              </>
            )}
          </td>
        </tr>
      }
    </>
  );
}

export default SingleList;
