import axios from "axios";
import {
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
  ENDPOINT_MOVIE,
  API_KEY,
} from "../constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchData = async (search, pageParam) => {
  const { data } = await axios.get(
    search === ""
      ? `${ENDPOINT_DISCOVER}&page=${pageParam}`
      : `${ENDPOINT_SEARCH}&query=${search}&page=${pageParam}`
  );
  return {
    results: data.results,
    next: data.total_pages !== data.page ? data.page + 1 : null,
  };
};

export const useGetMovieData = (search) => {
  return useInfiniteQuery({
    queryKey: ["movies", search],
    queryFn: ({ pageParam = 1 }) => fetchData(search, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
  });
};

export const useGetMovieById = (id, isEnabled) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${ENDPOINT_MOVIE}/${id}?api_key=${API_KEY}&append_to_response=videos`
      );
      return data;
    },
    enabled: isEnabled,
    staleTime: Infinity,
  });
};
