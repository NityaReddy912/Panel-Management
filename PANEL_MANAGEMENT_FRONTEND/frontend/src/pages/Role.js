import RoleList from "../Components/SearchList/RoleList";
import Headers from "../Components/Utils/Headers";

function Role() {
  return (
    <div className='wrapper'>
      <Headers />
      <RoleList filterName='role' />
    </div>
  );
}

export default Role;
