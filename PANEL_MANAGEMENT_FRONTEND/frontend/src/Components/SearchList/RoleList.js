import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchList from "./SearchList";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddModel from "../AddList/AddModel";

function RoleList({ filterName }) {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [show, setShow] = useState(false);
  const [roleList, setRoleList] = useState();
  const [page, setPage] = useState(1);
  const [fetchAdd, setFetchAdd] = useState();
  const [notValidate, setNotValidate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isApiSubscribed = true;
    let fetchName;
    let queryName;
    const getRoleList = async () => {
      switch (filterName) {
        case "role":
          fetchName = "role";
          queryName = "role";
          setFetchAdd("role");
          break;
        case "candidate role":
          fetchName = "candidate-role";
          queryName = "candidateRole";
          setFetchAdd("candidate-role");
          break;
        case "panel level":
          fetchName = "panel-level";
          queryName = "panelLevel";
          setFetchAdd("panel-level");
          break;
        case "grade":
          fetchName = "grade";
          queryName = "grade";
          setFetchAdd("grade");
          break;
        case "candidate status":
          fetchName = "candidate-status";
          queryName = "candidateStatus";
          setFetchAdd("candidate-status");
          break;

        default:
          break;
      }

      try {
        if (!token) {
          return;
        }
        if (roleId || roleName) {
          setIsLoading(true);
          const roleListResponse = await fetch(
            `http://localhost:5000/${fetchName}?page=${page}&${queryName}Id=${roleId}&${queryName}Name=${roleName}`,
            {
              headers: {
                "x-access-token":
                  window.sessionStorage.getItem("token"),
              },
            },
          );

          const roleListData =
            await roleListResponse.json();

          console.log(roleListData);

          setRoleList(roleListData);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          const roleListResponse = await fetch(
            `http://localhost:5000/${fetchName}/all?page=${page}`,
            {
              headers: {
                "x-access-token":
                  window.sessionStorage.getItem("token"),
              },
            },
          );

          const roleListData =
            await roleListResponse.json();

          console.log(roleListData);

          setRoleList(roleListData);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isApiSubscribed) {
      getRoleList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [token, roleId, roleName, filterName, fetchAdd, open]);

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrevious = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleLastPage = () => {
    console.log("Hi");
    setPage(Math.ceil(roleList?.totalItems / 3));
  };

  const handleSearchData = (searchedData) => {
    console.log(searchedData);
    setRoleId(searchedData.roleId);
    setRoleName(searchedData.roleName);
    // setNotSubmit(searchedData.notSubmit);
    if (
      searchedData.roleId ||
      (searchedData.roleName && !searchedData.notSubmit)
    ) {
      setShow(true);
      console.log("Show");
    } else {
      console.log("!Show");
      setShow(false);
    }

    if (searchedData.notSubmit) {
      setShow(false);
      console.log("!Show");
    }
    console.log("UP", roleId, roleName, searchedData);
  };

  const handleValidateData = (validateData) => {
    setNotValidate(validateData.notValidate);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='container-wrap'>
      <h2 className='searchHead'>{filterName} Master</h2>

      <div className='row'>
        <div className='col-md-12'>
          {/* <Link to={`/${fetchAdd}/add`}> */}
          <button
            type='submit'
            onClick={handleOpen}
            className={`btn btn-primary float-end addButton ${
              filterName === "panel level" ||
              filterName === "panel type"
                ? "addBtnPanel"
                : ""
            } ${
              (filterName === "candidate status" ||
                filterName === "candidate role") &&
              "addBtnCS"
            }`}>
            <PlusIcon className='plusIcon' /> Add{" "}
            {filterName}
          </button>
          {/* </Link> */}
          <AddModel
            handleClose={handleClose}
            open={open}
            filterName={filterName}
          />
        </div>
      </div>
      <Search
        onSearchValidate={handleValidateData}
        onSearchData={handleSearchData}
        filterName={filterName}
        fetchAdd={fetchAdd}
      />
      {
        <SearchList
          isLoading={isLoading}
          roleList={roleList}
          onNext={onNext}
          onPrevious={onPrevious}
          page={page}
          filterName={filterName}
          roleId={roleId}
          roleName={roleName}
          onLast={handleLastPage}
        />
      }
    </div>
  );
}

export default RoleList;
