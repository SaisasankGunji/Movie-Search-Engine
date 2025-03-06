import "../css/MovieModal.css";

function MovieModal({ movie, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Movie Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="modal-movie-poster"
        />

        {/* Movie Details */}
        <h2>{movie.title}</h2>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Popularity:</strong> {movie.popularity}
        </p>
        <p>
          <strong>Vote Average:</strong> {movie.vote_average} / 10
        </p>
        <p>
          <strong>Vote Count:</strong> {movie.vote_count}
        </p>
        <p>
          <strong>Original Language:</strong>{" "}
          {movie.original_language.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default MovieModal;
