import React from "react";
import RoleList from "../Components/SearchList/RoleList";
import Headers from "../Components/Utils/Headers";

function CandidateStatus() {
  return (
    <div className='wrapper'>
      <Headers />
      <RoleList filterName='candidate status' />
    </div>
  );
}

export default CandidateStatus;