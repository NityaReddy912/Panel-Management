import React from "react";
// import "../../Main.scss";
import Paginator from "./Paginator"
import SingleList from "./SingleList";
function SearchList({
  roleList,
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <>
      {roleList?.length ? (
        <div className='search container-fluid'>
          <Paginator
            onPrevious={onPrevious}
            onNext={onNext}
            totalPages={totalPages}
            page={page}
            lastPage={
              roleList
                ? Math.ceil(roleList.totalItems / 3)
                : 1
            }
            currentPage={page}>
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope="col">Panel ID</th>
                  <th scope='col'>Panel Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Contact</th>
                  <th scope='col'>Role</th>
                  <th scope='col'>Interview Type</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Slot</th>
                  <th scope='col'>Availability Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {roleList.map((data, index) => {
                if((index >= (page - 1) * 3) && (index < (page * 3))){
                 return( <SingleList
                    key={data.PanelID}
                    //key={role._id}
                    hash={index + 1}
               
                    role={data}
                    
                  />)
 }})}
              </tbody>
            </table>
          </Paginator>
        </div>
      ) : (
        <p className='mt-5 container display-4'>
          No Data Found
        </p>
      )}
      <b>{totalPages ? ((page * 3 - 2) + " - " + (page * 3 <= totalPages ? page * 3 : totalPages) + " of " + Math.ceil(totalPages) + " records") : ""}</b>
    </>
  );
}

export default SearchList;
