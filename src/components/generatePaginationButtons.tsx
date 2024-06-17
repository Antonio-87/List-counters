import useStore from '../hooks/useContext';

const GeneratePaginationButtons = () => {
  const { meters } = useStore();
  let buttons = [];

  if (meters.totalPages <= 6) {
    buttons = Array.from({ length: meters.totalPages }, (_, i) => i + 1);
  } else {
    buttons = [1, 2, 3];
    buttons.push(0);
    buttons = buttons.concat(
      Array.from({ length: 3 }, (_, i) => meters.totalPages - 2 + i)
    );
  }

  return (
    <footer className="pagination">
      {buttons.map((page) =>
        page === 0 ? (
          <select
            className="pagination-select"
            onChange={(e) => meters.setCurrentPage(parseInt(e.target.value))}
            key={page}
          >
            <option value="..."></option>
            {Array.from({ length: meters.totalPages - 5 }, (_, i) => i + 1).map(
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
            onClick={() => meters.setCurrentPage(page)}
          >
            {page}
          </button>
        )
      )}
    </footer>
  );
};

export default GeneratePaginationButtons;
