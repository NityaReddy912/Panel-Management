import SingleList from "./Singlelist";
import "./SearchList.scss";
import Paginator from "../Utils/Paginator";
import { useState } from "react";
//import { Action } from "@remix-run/router";

function SearchList({
  candidateList,
  onNext,
  onPrevious,
  page,
  isLoading,
  CandidateName,
  Email,
  Role,
  status,
  onLast,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = candidateList?.candidate?.slice(
    itemOffset,
    endOffset,
  );
  const pageCount = Math.ceil(
    candidateList?.candidate?.length / 10,
  );

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) %
      candidateList?.candidate?.length;
    if (itemOffset < newOffset) {
      onNext();
      return setItemOffset(newOffset);
    }
    if (itemOffset > newOffset) {
      onPrevious();
      return setItemOffset(newOffset);
    }
  };
  return (
    <>
      {!isLoading && (
        <div className='container-wrap px-2'>
          {candidateList?.candidate?.length ? (
            <>
              <table className='searchList__lists my-1'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Candidate Name</th>
                    <th>Candidate Email</th>
                    <th>Candidate Contact</th>
                    <th>PAN</th>
                    <th>Role</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((candidate, index) => (
                    <SingleList
                      key={candidate.cid}
                      hash={page * 10 - 10 + (index + 1)}
                      candidate={candidate}
                      id={candidate._id}
                    />
                  ))}
                </tbody>
              </table>
              {!candidateList.totalItems ? null : (
                <span className=''>
                  {page * 10 -
                    9 +
                    " - " +
                    (page * 10 <= candidateList.totalItems
                      ? page * 10
                      : candidateList.totalItems) +
                    " of " +
                    Math.ceil(candidateList.totalItems) +
                    " records"}
                </span>
              )}
              <Paginator
                totalItems={candidateList?.totalItems}
                currentPage={page}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </>
          ) : (
            <h3 className='searchList__noResult'>
              No Result Found For this Search
            </h3>
          )}
          {/* <br></br> */}
        </div>
      )}
    </>
  );
}

export default SearchList;
