import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "components/row/Row.css";
import { Link } from "react-router-dom";
import backdropImg from "img/backdrop.jpg";
import styled from "styled-components";

const Row = styled.div`
  margin: 20px 40px 0;
`;

const RowTitlePrimary = styled.h2`
  margin: 40px 0 20px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowTitleSecondary = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0 0 12px;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.3s ease-out 0.4s;
  color: #fff;
`;

const RowDescription = styled.p`
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.3s ease-out 0.2s;
  color: #fff;
`;

const FaAngleDownIcon = styled.i`
  color: #ffffff80;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.3s ease-out;
`;

function RowMovies({ title, fetchData, secondRow }) {
  const imgUrl = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const request = await axios.get(fetchData);
        setMovies(request.data.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoviesData();
  }, [fetchData]);

  const setImage = (secondRow, movie) => {
    if (secondRow) {
      return imgUrl + movie.poster_path;
    }
    if (movie.backdrop_path) {
      return imgUrl + movie.backdrop_path;
    }
    if (!movie.backdrop_path) {
      return backdropImg;
    }
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Row>
      <RowTitlePrimary>{title}</RowTitlePrimary>
      <RowPosters>
        {movies?.map((movie) => (
          <div key={movie.id}>
            <div
              className={`row__poster ${
                secondRow && "row__poster row__poster--secondRow"
              }`}
            >
              <Link to={`/movies/${movie.id}`}>
                <img
                  className={`row__picture ${
                    secondRow
                      ? "row__picture row__picture--secondRow"
                      : "row__picture row__picture--otherRows"
                  }`}
                  src={`${setImage(secondRow, movie)}`}
                  alt={movie.title || movie.original_title}
                />
                <div
                  className={`row__overview ${
                    secondRow
                      ? "row__overview row__overview--secondRow"
                      : "row__overview row__overview--otherRows"
                  }`}
                >
                  <RowTitleSecondary>
                    {movie.title || movie.original_title}
                  </RowTitleSecondary>
                  <RowDescription>
                    {truncate(movie.overview, 125)}
                  </RowDescription>
                  <FaAngleDownIcon className="fas fa-angle-down fa-2x" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </RowPosters>
    </Row>
  );
}

export default RowMovies;
