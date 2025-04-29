import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualSearch, setManualSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeMovie, setActiveMovie] = useState(null); // State for selected movie modal

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (!searchQuery.trim()) {
          data = await getPopularMovies(currentPage);
        } else {
          data = await searchMovies(searchQuery, currentPage);
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (err) {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage, manualSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setManualSearch(true);
    setCurrentPage(1); // Reset to first page on new search
    setTimeout(() => setManualSearch(false), 100);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className={`home ${activeMovie ? "modal-active" : ""}`}>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Movie List */}
      {loading ? (
        <div className="loading"></div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                setActiveMovie={setActiveMovie}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="pagination-first"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-arrow"
            >
              &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(currentPage + 2, totalPages)
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-number ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-arrow"
            >
              &raquo;
            </button>
          </div>
        </>
      )}

      {/* Modal (Only show when a movie is selected) */}
      {activeMovie && (
        <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
      )}
    </div>
  );
}

export default Home;
