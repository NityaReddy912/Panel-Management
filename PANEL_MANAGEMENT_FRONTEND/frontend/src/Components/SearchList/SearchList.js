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
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = roleList?.role?.slice(
    itemOffset,
    endOffset,
  );
  const pageCount = Math.ceil(roleList?.role?.length / 10);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) % roleList?.role?.length;
    if (itemOffset < newOffset) {
      onNext();
      return setItemOffset(newOffset);
    }
    if (itemOffset > newOffset) {
      onPrevious();
      return setItemOffset(newOffset);
    }
  };
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
          {currentItems?.length ? (
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
                <tbody>
                  {currentItems?.map((role, index) => (
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
              <Paginator
                totalItems={roleList?.totalItems}
                currentPage={page}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
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
