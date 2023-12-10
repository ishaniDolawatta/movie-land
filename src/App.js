import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Movies from "./components/Movies";
import "./app.scss";
import Header from "./components/Header";
import WatchLater from "./components/WatchLater";
import Starred from "./components/Starred";
import YoutubePlayer from "./components/YoutubePlayer";

const App = () => {
  const [trailer, viewTrailer] = useState();

  return (
    <div className="App">
      <Header />

      <div className="container">
        {trailer && (
          <YoutubePlayer
            movieId={trailer}
            closeTrailer={() => viewTrailer(undefined)}
          />
        )}

        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} />} />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
