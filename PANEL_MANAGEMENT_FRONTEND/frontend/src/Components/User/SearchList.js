//import React, { useState } from "react";
import SingleList from "./SingleList";
import "./SearchList.scss";
import Paginator from "../Utils/Paginator";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useEffect, useState } from "react";
//import { Action } from "@remix-run/router";

function SearchList({
  userList,
  page,
  onNext,
  onPrevious,
  handleSearch,
  search,
}) {
  const user = useSelector(selectUser);
  const [role, setRole] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = userList?.user?.slice(
    itemOffset,
    endOffset,
  );
  const pageCount = Math.ceil(userList?.user?.length / 10);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) % userList?.user?.length;
    if (itemOffset < newOffset) {
      onNext();
      return setItemOffset(newOffset);
    }
    if (itemOffset > newOffset) {
      onPrevious();
      return setItemOffset(newOffset);
    }
  };
  console.log(userList);
  useEffect(() => {
    let isApiSubscribed = true;
    if (user) {
      console.log(user);
      const getRoleList = async () => {
        const roleListResponse = await fetch(
          `http://localhost:5000/role/role-id/${user.role_id}`,
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
  });
  console.log(userList, page);
  return (
    <div className='container-wrap'>
      {userList?.user?.length ? (
        <>
          <table className='searchList__lists'>
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>&nbsp;</th>
                {role === "practice head" && (
                  <th>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((user, index) => (
                <SingleList
                  key={user._id}
                  hash={page * 10 - 10 + (index + 1)}
                  user={user}
                  page={page}
                  search={search}
                  handleSearch={handleSearch}
                />
              ))}
            </tbody>
          </table>
          <span>
            {userList?.totalitems
              ? page * 10 -
                9 +
                " - " +
                (page * 10 <= userList?.totalitems
                  ? page * 10
                  : userList?.totalitems) +
                " of " +
                Math.ceil(userList?.totalitems) +
                " records"
              : ""}
          </span>
          <Paginator
            totalItems={userList?.totalitems}
            currentPage={page}
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </>
      ) : (
        <>
          <table className='searchList__lists'>
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>&nbsp;</th>
                {role === "practice head" && (
                  <th>Action</th>
                )}
              </tr>
            </thead>
          </table>
          <h3 className='searchList__noResult'>
            No Result Found For this Search
          </h3>
        </>
      )}
    </div>
  );
}

export default SearchList;
