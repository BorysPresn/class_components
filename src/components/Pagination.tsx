import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, onPageChange } = props;

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
