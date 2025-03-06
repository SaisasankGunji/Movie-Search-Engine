import { useState } from "react";
import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Favourites() {
  const { favourites } = useMovieContext();
  const [activeMovie, setActiveMovie] = useState(null);

  return (
    <div className="favourites">
      <h2 className="favourites-title">Your Favourites</h2>
      {favourites.length > 0 ? (
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              setActiveMovie={setActiveMovie}
            />
          ))}
        </div>
      ) : (
        <div className="favourites-empty">
          <h2 className="favourites-empty-title">No Favourite Movies Yet</h2>
          <p>
            Start adding movies to your favourites and they will appear here!
          </p>
        </div>
      )}

      {/* Movie Modal */}
      {activeMovie && (
        <MovieModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
      )}
    </div>
  );
}

export default Favourites;
