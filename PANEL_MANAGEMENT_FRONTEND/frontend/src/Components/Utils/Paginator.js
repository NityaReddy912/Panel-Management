import ReactPaginate from "react-paginate";
import "./Paginator.scss";

function Paginator({
  totalItems,
  handlePageClick,
  pageCount,
}) {
  return (
    <div className='paginators'>
      <nav className='paginator'>
               {" "}
        {totalItems > 10 && (
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='<Prev'
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        )}
             {" "}
      </nav>
         {" "}
    </div>
  );
}

export default Paginator;
