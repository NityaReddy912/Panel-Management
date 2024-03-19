import Headers from "../Utils/Headers";
import AddForm from "./AddForm";

function AddList({ filterName }) {
  return (
    <div className='wrapper'>
      <Headers />
      <AddForm filterName={filterName} />
    </div>
  );
}

export default AddList;
