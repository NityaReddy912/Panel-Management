import "./Paginator.scss";
function Paginator({
    children,
    onPrevious,
    onNext,
    lastPage,
    currentPage,
}) {
    return (
        <div className='paginator'>
            {children}
            <div className='paginator__controls'>
                {currentPage > 1 && (
                    <button className='paginator__control' onClick={onPrevious}> 
                    {currentPage - 1}
                    </button>
                )}
                {currentPage && ( 
                <button className='paginator__control active'>
                    {currentPage}
                </button>
                )}
                {currentPage < lastPage && ( 
                <button className='paginator__control' onClick={onNext}>
                    {currentPage + 1}
                </button>
                )}
            </div>
        </div>
    );
}



export default Paginator;