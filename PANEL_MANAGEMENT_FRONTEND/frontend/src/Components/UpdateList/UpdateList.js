import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "../Utils/Headers";
import UpdateForm from "./UpdateForm";

function UpdateList({ filterName }) {
  const [roleList, setRoleList] = useState("");

  const { id } = useParams();
  useEffect(() => {
    let isApiSubscribed = true;
    let fetchName;

    switch (filterName) {
      case "role":
        fetchName = "role";
        break;
      case "panel type":
        fetchName = "panel-type";
        break;
      case "panel level":
        fetchName = "panel-level";
        break;
      case "grade":
        fetchName = "grade";
        break;
      case "candidate status":
        fetchName = "candidate-status";
        break;

      default:
        break;
    }
    const getRoleList = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/${fetchName}/${id}`,
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
      getRoleList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [id, filterName]);
  console.log(roleList);
  return (
    <div class='wrapper'>
      <Headers />
      <UpdateForm
        roleList={roleList}
        filterName={filterName}
      />
    </div>
  );
}

export default UpdateList;
