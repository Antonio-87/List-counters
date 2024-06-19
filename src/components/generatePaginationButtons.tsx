const GeneratePaginationButtons = ({
  totalPages,
  setCurrentPage,
}: {
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) => {
  let buttons = [];

  if (totalPages <= 6) {
    buttons = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    buttons = [1, 2, 3];
    buttons.push(0);
    buttons = buttons.concat(
      Array.from({ length: 3 }, (_, i) => totalPages - 2 + i)
    );
  }

  return (
    <footer className="pagination">
      {buttons.map((page) =>
        page === 0 ? (
          <select
            className="pagination-select"
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            key={page}
            value="..."
          >
            <option value="...">...</option>
            {Array.from({ length: totalPages - 5 }, (_, i) => i + 1).map(
              (page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              )
            )}
          </select>
        ) : (
          <button
            className="pagination-button"
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page === 0 ? '...' : page}
          </button>
        )
      )}
    </footer>
  );
};

export default GeneratePaginationButtons;
