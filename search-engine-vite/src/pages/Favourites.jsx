import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();

  return (
    <div className="favourites">
      <h2>Your Favourites</h2>
      {favourites.length > 0 ? (
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="favourites-empty">
          <h2>No Favourite Movies Yet</h2>
          <p>
            Start adding movies to your favourites and they will appear here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Favourites;
