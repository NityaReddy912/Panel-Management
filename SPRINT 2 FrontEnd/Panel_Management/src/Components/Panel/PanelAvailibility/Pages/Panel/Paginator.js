import React from 'react';
import classnames from 'classnames';
import usePagination from './usePagination';
import DOTS from './usePagination';

import './Paginator.scss';
const Paginator = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default {Paginator};






// import "./Paginator.scss";
// function Paginator({
//     children,
//     onPrevious,
//     onNext,
//     lastPage,
//     currentPage,
// }) {
//     return (
//         <div className='paginator'>
//             {children}
//             <div className='paginator__controls'>
//                  {currentPage > 1 && (
//                     <button className='paginator__control' onClick={onPrevious}> 
//                     {currentPage - 1}
//                      </button>
//                  )}
//                 {currentPage && (                  <button className='paginator__control active'>
//                      {currentPage}
//                  </button>
//                  )}
//                  {currentPage < lastPage && ( 
//                  <button className='paginator__control' onClick={onNext}>
//                      {currentPage + 1}
//                  </button>
//                 )}
//            </div>
//        </div>
//      );
//  }



// export default Paginator;


// const paginationNumbers = document.getElementById("pagination-numbers");
// const paginatedList = document.getElementById("paginated-list");
// const listItems = paginatedList.querySelectorAll("li");
// const nextButton = document.getElementById("next-button");
// const prevButton = document.getElementById("prev-button");

// const paginationLimit = 10;
// const pageCount = Math.ceil(listItems.length / paginationLimit);
// let currentPage = 1;

// const disableButton = (button) => {
//   button.classList.add("disabled");
//   button.setAttribute("disabled", true);
// };

// const enableButton = (button) => {
//   button.classList.remove("disabled");
//   button.removeAttribute("disabled");
// };

// const handlePageButtonsStatus = () => {
//   if (currentPage === 1) {
//     disableButton(prevButton);
//   } else {
//     enableButton(prevButton);
//   }

//   if (pageCount === currentPage) {
//     disableButton(nextButton);
//   } else {
//     enableButton(nextButton);
//   }
// };

// const handleActivePageNumber = () => {
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     button.classList.remove("active");
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex == currentPage) {
//       button.classList.add("active");
//     }
//   });
// };

// const appendPageNumber = (index) => {
//   const pageNumber = document.createElement("button");
//   pageNumber.className = "pagination-number";
//   pageNumber.innerHTML = index;
//   pageNumber.setAttribute("page-index", index);
//   pageNumber.setAttribute("aria-label", "Page " + index);

//   paginationNumbers.appendChild(pageNumber);
// };

// const getPaginationNumbers = () => {
//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;

//   handleActivePageNumber();
//   handlePageButtonsStatus();
  
//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;

//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });
// };

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);

//   prevButton.addEventListener("click", () => {
//     setCurrentPage(currentPage - 1);
//   });

//   nextButton.addEventListener("click", () => {
//     setCurrentPage(currentPage + 1);
//   });

//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));

//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });

// export const usePagination = ({
//     totalCount,
//     pageSize,
//     siblingCount = 1,
//     currentPage
//   }) => {
//     const paginationRange = useMemo(() => {
//       const totalPageCount = Math.ceil(totalCount / pageSize);
  
//       // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
//       const totalPageNumbers = siblingCount + 5;
  
//       /*
//         Case 1:
//         If the number of pages is less than the page numbers we want to show in our
//         paginationComponent, we return the range [1..totalPageCount]
//       */
//       if (totalPageNumbers >= totalPageCount) {
//         return range(1, totalPageCount);
//       }
      
//       /*
//           Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
//       */
//       const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
//       const rightSiblingIndex = Math.min(
//         currentPage + siblingCount,
//         totalPageCount
//       );
  
//       /*
//         We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
//       */
//       const shouldShowLeftDots = leftSiblingIndex > 2;
//       const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  
//       const firstPageIndex = 1;
//       const lastPageIndex = totalPageCount;
  
//       /*
//           Case 2: No left dots to show, but rights dots to be shown
//       */
//       if (!shouldShowLeftDots && shouldShowRightDots) {
//         let leftItemCount = 3 + 2 * siblingCount;
//         let leftRange = range(1, leftItemCount);
  
//         return [...leftRange, DOTS, totalPageCount];
//       }
  
//       /*
//           Case 3: No right dots to show, but left dots to be shown
//       */
//       if (shouldShowLeftDots && !shouldShowRightDots) {
        
//         let rightItemCount = 3 + 2 * siblingCount;
//         let rightRange = range(
//           totalPageCount - rightItemCount + 1,
//           totalPageCount
//         );
//         return [firstPageIndex, DOTS, ...rightRange];
//       }
       
//       /*
//           Case 4: Both left and right dots to be shown
//       */
//       if (shouldShowLeftDots && shouldShowRightDots) {
//         let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//         return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
//       }
//     }, [totalCount, pageSize, siblingCount, currentPage]);
  
//     return paginationRange;
//   };



// import "./Paginator.scss";
// // function Paginator({
// //     children,
// //     onPrevious,
// //     onNext,
// //     lastPage,
// //     currentPage,
// // }) {
// //     return (
// //         <div className='paginator'>
// //             {children}
// //             <div className='paginator__controls'>
// //                 {currentPage > 1 && (
// //                     <button className='paginator__control' onClick={onPrevious}> 
// //                     {currentPage - 1}
// //                     </button>
// //                 )}
// //                 {currentPage && ( 
// //                 <button className='paginator__control active'>
// //                     {currentPage}
// //                 </button>
// //                 )}
// //                 {currentPage < lastPage && ( 
// //                 <button className='paginator__control' onClick={onNext}>
// //                     {currentPage + 1}
// //                 </button>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }



// // export default Paginator;


// const paginationNumbers = document.getElementById("pagination-numbers");
// const paginatedList = document.getElementById("paginated-list");
// const listItems = paginatedList.querySelectorAll("li");
// const nextButton = document.getElementById("next-button");
// const prevButton = document.getElementById("prev-button");

// const paginationLimit = 10;
// const pageCount = Math.ceil(listItems.length / paginationLimit);
// let currentPage = 1;

// const disableButton = (button) => {
//   button.classList.add("disabled");
//   button.setAttribute("disabled", true);
// };

// const enableButton = (button) => {
//   button.classList.remove("disabled");
//   button.removeAttribute("disabled");
// };

// const handlePageButtonsStatus = () => {
//   if (currentPage === 1) {
//     disableButton(prevButton);
//   } else {
//     enableButton(prevButton);
//   }

//   if (pageCount === currentPage) {
//     disableButton(nextButton);
//   } else {
//     enableButton(nextButton);
//   }
// };

// const handleActivePageNumber = () => {
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     button.classList.remove("active");
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex == currentPage) {
//       button.classList.add("active");
//     }
//   });
// };

// const appendPageNumber = (index) => {
//   const pageNumber = document.createElement("button");
//   pageNumber.className = "pagination-number";
//   pageNumber.innerHTML = index;
//   pageNumber.setAttribute("page-index", index);
//   pageNumber.setAttribute("aria-label", "Page " + index);

//   paginationNumbers.appendChild(pageNumber);
// };

// const getPaginationNumbers = () => {
//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;

//   handleActivePageNumber();
//   handlePageButtonsStatus();
  
//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;

//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });
// };

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);

//   prevButton.addEventListener("click", () => {
//     setCurrentPage(currentPage - 1);
//   });

//   nextButton.addEventListener("click", () => {
//     setCurrentPage(currentPage + 1);
//   });

//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));

//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });

// export const usePagination = ({
//     totalCount,
//     pageSize,
//     siblingCount = 1,
//     currentPage
//   }) => {
//     const paginationRange = useMemo(() => {
//       const totalPageCount = Math.ceil(totalCount / pageSize);
  
      // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    //   const totalPageNumbers = siblingCount + 5;
  
      /*
        Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
      */
    //   if (totalPageNumbers >= totalPageCount) {
    //     return range(1, totalPageCount);
    //   }
      
      /*
          Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
      */
    //   const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    //   const rightSiblingIndex = Math.min(
    //     currentPage + siblingCount,
    //     totalPageCount
    //   );
  
      /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
      */
    //   const shouldShowLeftDots = leftSiblingIndex > 2;
    //   const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  
    //   const firstPageIndex = 1;
    //   const lastPageIndex = totalPageCount;
  
      /*
          Case 2: No left dots to show, but rights dots to be shown
      */
    //   if (!shouldShowLeftDots && shouldShowRightDots) {
    //     let leftItemCount = 3 + 2 * siblingCount;
    //     let leftRange = range(1, leftItemCount);
  
    //     return [...leftRange, DOTS, totalPageCount];
    //   }
  
      /*
          Case 3: No right dots to show, but left dots to be shown
    //   */
    //   if (shouldShowLeftDots && !shouldShowRightDots) {
        
    //     let rightItemCount = 3 + 2 * siblingCount;
    //     let rightRange = range(
    //       totalPageCount - rightItemCount + 1,
    //       totalPageCount
    //     );
    //     return [firstPageIndex, DOTS, ...rightRange];
    //   }
       
      /*
          Case 4: Both left and right dots to be shown
      */
//       if (shouldShowLeftDots && shouldShowRightDots) {
//         let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//         return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
//       }
//     }, [totalCount, pageSize, siblingCount, currentPage]);
  
//     return paginationRange;
//   };