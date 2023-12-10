import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Movie from "./Movie";
import "../styles/starred.scss";
import { features } from "../constants";

const Starred = ({ viewTrailer }) => {
  const [starredList, setStarredList] = useLocalStorage(
    features.STAR_MOVIE,
    []
  );

  return (
    <div className="starred" data-testid="starred">
      {starredList.length > 0 && (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header mb-4">Starred movies</h6>
          <div className="row">
            {starredList.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => setStarredList([])}
            >
              Remove all starred
            </button>
          </footer>
        </div>
      )}

      {starredList.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Starred;
