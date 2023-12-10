import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Movie from "./Movie";
import "../styles/starred.scss";
import { features } from "../constants";

const WatchLater = ({ viewTrailer }) => {
  const [watchLater, setWatchLaterList] = useLocalStorage(
    features.WATCH_LATER,
    []
  );

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLater.length > 0 && (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header mb-4">Watch Later List</h6>
          <div className="row">
            {watchLater.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => setWatchLaterList([])}
            >
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLater.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
