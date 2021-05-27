import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';



export default function Paginator(props) {
  const { data, RenderComponent, pageLimit, dataLimit } = props;

  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };


  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);


  return (
    <div>
      <div className="pokemon-grid">
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-active'}`}
        >
          <AiOutlineLeft id="left" size={30}>
          </AiOutlineLeft>
        </button>

        {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={changePage}
          className={`btn ${currentPage === item ? 'selected' : null}`}
        >
          <span>{item}</span>
        </button>
      ))}

        <button
          onClick={goToNextPage}
          className={`btn ${currentPage === pages ? 'btn-disabled' : 'btn-active'}`}
        >
          <AiOutlineRight id="right" size={30} >
          </AiOutlineRight>
        </button>
      </div>
    </div>
  )
}
