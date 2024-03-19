import React from "react";
import RoleList from "../Components/SearchList/RoleList";
import Headers from "../Components/Utils/Headers";

function PanelLevel() {
  return (
    <div className='wrapper'>
      <Headers />
      <RoleList filterName='panel level' />
    </div>
  );
}

export default PanelLevel;
