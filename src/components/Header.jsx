import {
  Link,
  NavLink,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import "../styles/header.scss";
import useDebounce from "../hooks/use-debounce";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { features, routes } from "../constants";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [searchValue, setSearchValue] = useState(searchQuery ?? "");
  const debouncedSearchValue = useDebounce(searchValue);

  const [starredList] = useLocalStorage(features.STAR_MOVIE, []);

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      setSearchParams(createSearchParams({ search: debouncedSearchValue }));
    } else {
      setSearchParams();
    }
  }, [debouncedSearchValue, setSearchParams]);

  const resetSearch = () => {
    setSearchParams();
    setSearchValue("");
  };

  return (
    <header>
      <Link to={routes.HOME} data-testid="home" onClick={resetSearch}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to={routes.STARRED_MOVIE}
          data-testid="nav-starred"
          className="nav-starred"
          onClick={resetSearch}
        >
          {starredList.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredList.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink
          onClick={resetSearch}
          to={routes.WATCH_LATER}
          className="nav-fav"
        >
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link
          to="/"
          onClick={(e) => setSearchValue("")}
          className="search-link"
        >
          <input
            type="search"
            data-testid="search-movies"
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
