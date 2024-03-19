import React from "react";
import RoleList from "../Components/SearchList/RoleList";
import Headers from "../Components/Utils/Headers";

function PanelType() {
  return (
    <div className='wrapper'>
      <Headers />
      <RoleList filterName='candidate role' />
    </div>
  );
}

export default PanelType;
