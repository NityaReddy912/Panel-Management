import React from "react";
import RoleList from "../Components/SearchList/RoleList";
import Headers from "../Components/Utils/Headers";

function Grade() {
  return (
    <div className='wrapper'>
      <Headers />
      <RoleList filterName='grade' />
    </div>
  );
}

export default Grade;
