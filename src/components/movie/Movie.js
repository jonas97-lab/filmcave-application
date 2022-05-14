import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useTranslation } from "react-i18next";
import Cast from "components/cast/Cast";
import styled from "styled-components";
import { css } from "styled-components";

const MovieComponent = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const MovieTitle = styled.h2`
  margin: 60px 20px 30px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieDetails = styled.div`
  display: flex;
  margin: 20px 0 20px 20px;
`;

const MoviePicture = styled.div`
  max-width: 500px;
  margin: 0 75px;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-right: 1px solid #888;
  border-bottom: 1px solid #888;
  background-color: transparent;
  padding: 4px;
  background-size: cover;
  background-position: center;
  min-width: 500px;
  min-height: 725px;
  margin: 0 75px;
  border: 2px solid #888;
  position: relative;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MovieGenres = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #0f4d92;
  font-size: 13px;
  padding: 8px 14px;
  color: #fff;
  border-radius: 0.1vw;
  letter-spacing: 1px;
  text-align: center;
`;

const MovieBody = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const MovieTooltipText = styled.span`
  visibility: hidden;
  width: 160px;
  background-color: #3a3a3a;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  border-radius: 5px;
  position: absolute;
  z-index: 1;

  &:after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

const MovieTooltip = styled.div`
  position: relative;

  &:hover ${MovieTooltipText} {
    visibility: visible;
  }
`;

const MovieButtons = styled.div`
  display: flex;
  margin: 30px 0;

  a {
    text-decoration: none;
  }
`;

const MovieRating = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 1.4rem;
  font-weight: bold;

  span {
    font-weight: lighter;
    font-size: small;
  }
`;

const FaStarIcon = styled.i`
  color: #f5c518;
  margin-right: 5px;
`;

const FaPlayCircle = styled.i`
  margin-left: 10px;
`;

const button = css`
  padding: 15px 25px;
  outline: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.1vw;
`;

const MovieButtonOne = styled.button`
  ${button}

  margin-right: 20px;
  background-color: #a0a0a0;

  &:hover {
    background-color: #585858;
  }
`;

const MovieButtonTwo = styled.button`
  ${button}

  background-color: #0073cf;
  border: #0073cf;

  &:hover {
    background-color: #0f52b9;
  }
`;

function Movie() {
  const { id } = useParams();
  const { t } = useTranslation();
  const fetchData = `/movie/${id}/credits?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`;

  const [infoMovie, setInfoMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const request = await axios.get(
          `movie/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
        );
        setInfoMovie(request.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoviesData();
  }, [id]);

  // Watch movie trailer
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  // Object entries (movie details by id)
  for (const [key, value] of Object.entries(infoMovie)) {
    console.log(`${key} => ${value}`);
  }

  return (
    <MovieComponent>
      <MovieTitle>
        {t("show__title--one")} {infoMovie.title}
      </MovieTitle>
      <MovieWrapper>
        <MovieDetails key={infoMovie.id}>
          <MoviePicture
            style={{
              backgroundImage: infoMovie.poster_path
                ? `url('https://image.tmdb.org/t/p/w1280${infoMovie.poster_path}')`
                : `url('https://bit.ly/3gRaFw8')`,
            }}
          >
            {infoMovie.genres?.slice(0, 1).map((genre, idx) => (
              <MovieGenres key={idx}>
                <div>{genre.name}</div>
              </MovieGenres>
            ))}
          </MoviePicture>
          <MovieBody>
            <div>
              <MovieTooltip>
                <h1>{infoMovie.title || infoMovie.original_title}</h1>
                <p style={{ fontWeight: "bold" }}>{infoMovie.tagline}</p>

                <MovieRating>
                  <FaStarIcon className="fas fa-star" />
                  {infoMovie.vote_average}
                  <span>/ 10</span>
                </MovieRating>
                <p>{infoMovie.overview}</p>
                <Link to={`/translations-movie/${infoMovie.id}`}>
                  <MovieTooltipText>{t("show__tooltip")}</MovieTooltipText>
                </Link>
              </MovieTooltip>

              <MovieButtons>
                <Link to={`/reviews-movie/${infoMovie.id}`}>
                  <MovieButtonOne>{t("reviews__title")}</MovieButtonOne>
                </Link>

                <MovieButtonTwo onClick={() => handleClick(infoMovie)}>
                  {t("button--five")}
                  <FaPlayCircle className="far fa-play-circle" />
                </MovieButtonTwo>
              </MovieButtons>
              <p className="movie__description">
                {t("movie__description")}{" "}
                <Link to={`/release-dates-movie/${infoMovie.id}`}>
                  {t("movie__description--release")}
                </Link>
                .
              </p>
            </div>
          </MovieBody>
        </MovieDetails>
        <div style={{ marginTop: 20 }}>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
        <Cast fetchData={fetchData} />
      </MovieWrapper>
    </MovieComponent>
  );
}

export default Movie;
