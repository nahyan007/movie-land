import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./Component/MovieCard";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=9574dc48";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.totalResults);
  };

  useEffect(() => {
    searchMovies("superman");
  }, []);

  const selectPageHandeler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= movies.length / 2 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt="SearchIcon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.slice(page * 6 - 6, page * 6).map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {movies.length > 0 && (
        <div className="pagination">
          <AiOutlineCaretLeft
            onClick={() => selectPageHandeler(page - 1)}
            className={
              page > 1 ? "pagination__icon" : "pagination__disable"
            }
          />

          {[...Array(Math.ceil(movies.length / 5))].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectPageHandeler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}

          <AiOutlineCaretRight
            onClick={() => selectPageHandeler(page + 1)}
            className={
              page < movies.length/ 5 ? "pagination__icon" : "pagination__disable"
            }
          />
        </div>
      )}
    </div>
  );
};

export default App;
