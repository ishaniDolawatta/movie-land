import placeholder from "../assets/not-found-500X750.jpeg";
import { useLocalStorage } from "usehooks-ts";
import { features } from "../constants";

const Movie = ({ movie, isOpen, openCard, viewTrailer }) => {
  const [starList, setStarList] = useLocalStorage(features.STAR_MOVIE, []);
  const [watchLaterList, setWatchLaterList] = useLocalStorage(
    features.WATCH_LATER,
    []
  );

  const removeItemFromList = (key, id) => {
    let tempList =
      key === features.STAR_MOVIE ? [...starList] : [...watchLaterList];
    tempList = starList.filter((movie) => movie.id !== id);

    if (key === features.STAR_MOVIE) setStarList(tempList);
    else setWatchLaterList(tempList);
  };

  const addItemToList = (key) => {
    let tempList =
      key === features.STAR_MOVIE ? [...starList] : [...watchLaterList];
    tempList.push({
      id: movie.id,
      release_date: movie.release_date,
      overview: movie.overview,
      poster_path: movie.poster_path,
    });

    if (key === features.STAR_MOVIE) setStarList(tempList);
    else setWatchLaterList(tempList);
  };

  const isStarred = () => {
    return !!starList.find((localMovie) => localMovie.id === movie.id);
  };

  const isInWatchList = () => {
    return !!watchLaterList.find((localMovie) => localMovie.id === movie.id);
  };

  return (
    <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div className={`card ${isOpen ? "opened" : ""}`} onClick={openCard}>
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!isStarred() ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() => addItemToList(features.STAR_MOVIE)}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() =>
                  removeItemFromList(features.STAR_MOVIE, movie.id)
                }
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!isInWatchList() ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() => addItemToList(features.WATCH_LATER)}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() =>
                  removeItemFromList(features.WATCH_LATER, movie.id)
                }
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => viewTrailer(movie.id)}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={(e) => console.log(e)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
