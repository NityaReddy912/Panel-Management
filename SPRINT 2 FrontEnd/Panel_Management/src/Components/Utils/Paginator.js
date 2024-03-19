// import "./Paginator.scss";

function Paginator({
  children,
  onPrevious,
  onNext,
  lastPage,
  currentPage,
  totalItems,
}) {
  console.log(totalItems);
  return (
    <>
      <nav className='mb-0'>
        {children}

        {totalItems > 10 && (
          <ul className='pagination container justify-content-end mb-0'>
            <li className='page-item'>
              {currentPage > 1 && (
                <button
                  className='page-link'
                  aria-label='Previous'
                  onClick={onPrevious}>
                  <span aria-hidden='true'>&laquo;</span>
                  <span className='sr-only'>Prev</span>
                </button>
              )}
            </li>
            <li className='page-item'>
              {currentPage && (
                <button className='page-link active'>
                  {currentPage}
                </button>
              )}
            </li>
            <li className='page-item'>
              {currentPage < lastPage && (
                // <button
                //   className='page-link'
                //   onClick={onNext}>
                //   Next
                // </button>
                <button
                  className='page-link'
                  onClick={onNext}>
                  <span className='sr-only'>Next</span>
                  <span aria-hidden='true'>&raquo;</span>
                </button>
              )}
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Paginator;
