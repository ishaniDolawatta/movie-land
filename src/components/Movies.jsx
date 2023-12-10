import Movie from "./Movie";
import "../styles/movies.scss";
import { useGetMovieData } from "../hooks/use-get";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingDots from "./shared/LoadingDots";
import InfoContainer from "./shared/InfoContainer";

const Movies = ({ viewTrailer }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const observerTarget = useRef(null);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMovieData(searchQuery ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchNextPage, hasNextPage]);
  return (
    <div data-testid="movies" className="row grid-demo">
      {data?.pages.map((page, pageNum) => (
        <React.Fragment key={pageNum}>
          {page.results.map((movie) => (
            <Movie
              movie={movie}
              key={movie.id}
              openCard={() => console.log(movie.id)}
              viewTrailer={viewTrailer}
            />
          ))}
          {(page.results.length === 0 || isError) && (
            <InfoContainer text="No trailer available. Try another movie" />
          )}
        </React.Fragment>
      ))}
      <div
        className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2 card load-more-tag"
        ref={observerTarget}
      >
        {(isFetchingNextPage || isLoading) && <LoadingDots />}
      </div>
    </div>
  );
};

export default Movies;
