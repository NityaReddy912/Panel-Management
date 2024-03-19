 import "./Paginator.scss";

function Paginator({
  children,
  onPrevious,
  onNext,
  totalPages,
  page,
  lastPage,
  currentPage,
}) {
  return (
    <>
      <nav className=''>
        {children}
        <div className='btn-group' style={{ float: "right" }}>
                    <button className='btn btn-outline-primary col-sm-4' disabled={page === 1} onClick={onPrevious}>Prev</button>
                    <button className='btn btn-outline-primary col-sm-3' onClick={(e)=>{e.preventDefault()}}>{page}</button>
                    <button className='btn btn-outline-primary col-sm-4' disabled={page >= Math.ceil(totalPages / 10)} onClick={onNext}>Next</button>
                </div>
      </nav>
    </>
  );
}

export default Paginator;
