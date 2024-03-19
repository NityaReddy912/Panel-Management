import React, { useEffect, useState } from "react";
// import "../../Main.scss";
import Paginator from "../Utils/Paginator";
import SingleList from "./SingleList";

function SearchList({
  roleList,
  page,
  onPrevious,
  onNext,
  filterName,
  isLoading,
  onLast,
}) {
  const [deleteErr, setDeleteErr] = useState(false);
  console.log(roleList);
  const handleDeleteBy = (newDeleteBy) => {
    console.log(newDeleteBy);
    setDeleteErr(newDeleteBy.err);
  };

  useEffect(() => {
    setInterval(() => {
      setDeleteErr(false);
    }, 5000);
  }, [deleteErr]);

  console.log(onLast);

  return (
    <>
      {!isLoading && (
        <>
          {roleList?.role?.length ? (
            <div className='search container'>
              <Paginator
                onPrevious={onPrevious}
                onNext={onNext}
                onLast={onLast}
                lastPage={
                  roleList?.role?.length
                    ? Math.ceil(roleList.totalItems / 10)
                    : 1
                }
                totalItems={roleList?.totalItems}
                currentPage={page}>
                {/* {deleteErr && (
                  <p className='search__warning'>
                    {deleteErr}
                  </p>
                )} */}
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr
                      style={{
                        textTransform: "capitalize",
                      }}>
                      <th scope='col'>#</th>
                      <th scope='col'>{filterName} Id</th>
                      <th scope='col'>{filterName} Name</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleList.role?.map((role, index) => (
                      <SingleList
                        key={role._id}
                        hash={page * 10 - 10 + (index + 1)}
                        page={page}
                        role={role}
                        totalItems={roleList?.totalItems}
                        filterName={filterName}
                        onDeleteBy={handleDeleteBy}
                      />
                    ))}
                  </tbody>
                </table>
                <span>
                  {roleList?.totalItems
                    ? page * 10 -
                      9 +
                      " - " +
                      (page * 10 <= roleList?.totalItems
                        ? page * 10
                        : roleList?.totalItems) +
                      " of " +
                      Math.ceil(roleList?.totalItems) +
                      " records"
                    : ""}
                </span>
              </Paginator>
            </div>
          ) : (
            <div className='search container'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr
                    style={{
                      textTransform: "capitalize",
                    }}>
                    <th scope='col'>#</th>
                    <th scope='col'>{filterName} Id</th>
                    <th scope='col'>{filterName} Name</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
              </table>
              <h2>No Data Found</h2>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SearchList;
