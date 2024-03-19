import React from "react";
import RoleList from "../Components/SearchList/RoleList";
import Headers from "../Components/Utils/Headers";

function PanelType() {
  return (
    <div className='wrapper'>
      <Headers />
      <RoleList filterName='panel type' />
    </div>
  );
}

export default PanelType;
