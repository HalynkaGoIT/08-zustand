import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      breakLabel="…"
    />
  );
};

export default Pagination;
