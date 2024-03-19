import SingleList from "./Singlelist";
import "./SearchList.scss";
import Paginator from "../Utils/Paginator";
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
  return (
    <>
      {!isLoading && (
        <div className='container-wrap px-2'>
          {candidateList?.candidate?.length ? (
            <>
              <Paginator
                onPrevious={onPrevious}
                onNext={onNext}
                onLast={onLast}
                lastPage={
                  candidateList
                    ? Math.ceil(
                        candidateList.totalItems / 10,
                      )
                    : 1
                }
                totalItems={candidateList?.totalItems}
                currentPage={page}>
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
                    {candidateList.candidate?.map(
                      (candidate, index) => (
                        <SingleList
                          key={candidate.cid}
                          hash={
                            page * 10 - 10 + (index + 1)
                          }
                          candidate={candidate}
                          id={candidate._id}
                        />
                      ),
                    )}
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
              </Paginator>
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
