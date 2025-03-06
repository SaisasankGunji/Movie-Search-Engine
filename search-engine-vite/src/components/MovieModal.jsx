import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieModal.css";

function MovieModal({ movie, onClose }) {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMovieContext();
  const favourite = isFavourite(movie.id);

  function onLikeClick(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent modal from closing on click
    if (favourite) removeFromFavourites(movie.id);
    else addToFavourites(movie);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &#10006;
        </button>

        {/* Movie Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://demofree.sirv.com/nope-not-here.jpg"
          }
          alt={movie.title}
          className="modal-movie-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
          }}
        />

        {/* Like Button */}
        <button
          className={`like-btn ${favourite ? "active" : ""}`}
          onClick={onLikeClick}
          onDoubleClick={onLikeClick}
        >
          ♥
        </button>

        {/* Movie Details */}
        <h2 className="movie-title">{movie.title}</h2>
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
