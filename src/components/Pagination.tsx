interface IProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IProps> = (props) => {
  const startPage = Math.max(
    1,
    props.currentPage - Math.floor(props.itemsPerPage / 2),
  );
  const endPage = Math.min(
    props.totalItems,
    startPage + props.itemsPerPage - 1,
  );

  return (
    <div>
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {props.currentPage > 1 && (
          <li>
            <button
              className={`float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-primary text-gray-800 hover:text-white border-gray-200 hover:border-primary cursor-pointer`}
              onClick={() => props.onPageChange(props.currentPage - 1)}
            >
              {"<<"}
            </button>
          </li>
        )}

        {startPage > 1 && (
          <div className="px-1">
            <button
              className={`float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 ${props.currentPage === 1 ? "bg-primary text-white border-primary" : "bg-white text-gray-800 border-gray-200"} hover:bg-primary hover:text-white border-gray-200 hover:border-primary cursor-pointer`}
              onClick={() => props.onPageChange(1)}
              type="button"
            >
              1
            </button>
          </div>
        )}

        {startPage > 2 && <div className="px-1">...</div>}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index,
        ).map((page) => (
          <div className="px-1" key={page}>
            <button
              className={`float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 ${props.currentPage === page ? "bg-primary text-white border-primary" : "bg-white text-gray-800 border-gray-200"} hover:bg-primary hover:text-white hover:border-primary cursor-pointer`}
              onClick={() => props.onPageChange(page)}
              type="button"
              disabled={props.currentPage === page}
            >
              {page.toString()}
            </button>
          </div>
        ))}
        {endPage < props.totalItems - 1 && <div className="px-1">...</div>}
        {endPage < props.totalItems && (
          <div className="px-1">
            <button
              className={`float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 ${props.currentPage === props.totalItems - 1 ? "bg-primary text-white border-primary" : "bg-white text-gray-800 border-gray-200"} hover:bg-primary hover:text-white border-gray-200 hover:border-primary cursor-pointer`}
              onClick={() => props.onPageChange(props.totalItems - 1)}
              type="button"
            >
              {props.totalItems.toString()}
            </button>
          </div>
        )}
        <li>
          <button
            className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-[#283584] text-[#333333] hover:text-white border-[#F1F1F1] hover:border-[#283584] cursor-pointer"
            onClick={() => props.onPageChange(props.currentPage + 1)}
            disabled={props.currentPage === props.totalItems - 1}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
