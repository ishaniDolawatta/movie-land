import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useGetMovieById } from "../hooks/use-get";

import { videoTypes } from "../constants";
import "../styles/modal.scss";
import InfoContainer from "./shared/InfoContainer";

const YoutubePlayer = ({ movieId, closeTrailer }) => {
  const { data, isLoading, isError } = useGetMovieById(movieId, true);
  const [videoKey, setVideoKey] = useState();
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const windowScrollHandler = () => {
      const windowScrollTop = document.documentElement.scrollTop;
      const videoWrap = document.querySelector("#video-wrapper");
      const video = document.querySelector(".video-player");
      const videoHeight = video.offsetHeight;
      const videoBottom = videoHeight + videoWrap.offsetTop;

      if (windowScrollTop > videoBottom) {
        videoWrap.style.height = videoHeight + "px";
        setIsStuck(true);
      } else {
        videoWrap.style.height = "auto";
        setIsStuck(false);
      }
    };

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, []);

  useEffect(() => {
    setIsStuck(false);
  }, [movieId]);

  useEffect(() => {
    if (data) {
      const trailer =
        data.videos.results.find((vid) => vid.type === videoTypes.TRAILER)
          .trailer ?? data.videos.results[0].key;
      setVideoKey(trailer);
    }
  }, [data]);

  return (
    <div id="video-wrapper">
      {videoKey ? (
        <div
          className={`${isStuck ? "stuck" : "popup-overlay"}`}
          onClick={closeTrailer}
        >
          <ReactPlayer
            className="video-player"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls={true}
            playing={true}
            data-testid="youtube-player"
          />
          <span className="close-video">
            <i className="bi bi-x-circle" />
          </span>
        </div>
      ) : (
        !isLoading &&
        isError && (
          <InfoContainer text="no trailer available. Try another movie" />
        )
      )}
    </div>
  );
};

export default YoutubePlayer;
