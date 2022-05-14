import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "components/banner/BannerTVSeries";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

const ShowsTitlePrimary = styled.h2`
  margin: 60px 20px 30px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ShowsWrapper = styled.div`
  overflow: hidden;
  display: flex;

  @media (max-width: 960px) {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ShowsCards = styled.div`
  display: flex;
`;

const scrolling = keyframes`
 0% {
	transform: translateX(0);
}
100% {
	transform: translateX(-240vw);
}
`;

const ShowsPicture = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4);
`;

const ShowsContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 100%;
  padding: 20px;
  clip-path: circle(0% at 100% 100%);
  transition: all 0.7s ease-in-out;
`;

const ShowsCard = styled.div`
  font-family: "Open Sans", sans-serif;
  position: relative;
  height: 275px;
  width: 450px;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 10px;
  overflow: hidden;
  animation: ${scrolling} 50s linear infinite;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:hover ${ShowsPicture} {
	transition: all 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4);
	transform: scale(1.6) rotate(20deg);
	filter: blur(3px);
  }

  &:hover ${ShowsContent} {
	left: 0;
	transition: all 0.7s ease-in-out;
	clip-path: circle(75%);
  }

  @media  (max-width: 960px) {

		animation: none;
		height: 225px;
		width: 400px;
	
`;

const ShowsParagraph = styled.p`
  font-size: 14px;
`;

const ShowsButton = styled.button`
  position: absolute;
  text-transform: uppercase;
  letter-spacing: 1px;
  left: 20px;
  bottom: 20px;
  transition: 0.2s ease-in;
  outline: none;
  cursor: pointer;
  background-color: rgba(51, 51, 51, 0.5);
  font-size: 13px;
  color: #fff;
  padding: 13px 23px;
  border-radius: 0.2vw;
  border: rgba(51, 51, 51, 0.5);

  &:hover {
    background-color: rgba(51, 51, 51, 0.8);
  }
`;

function BannerMovies() {
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const { t } = useTranslation();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const request = await axios.get(
          `/trending/movie/day?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
        );
        setMovies(request.data.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoviesData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <ShowsTitlePrimary>{t("movies__title--one")}</ShowsTitlePrimary>
      <ShowsWrapper>
        {movies?.map((movie) => (
          <ShowsCards key={movie.id}>
            <ShowsCard>
              <ShowsPicture
                src={
                  movie.backdrop_path
                    ? imgUrl + movie.backdrop_path
                    : "https://bit.ly/3bIJlgj"
                }
                alt={movie.title || movie.original_title}
              />
              <ShowsContent>
                <ShowsParagraph>{truncate(movie.overview, 200)}</ShowsParagraph>
                <Link to={`/movies/${movie.id}`}>
                  <ShowsButton>{t("button--three")}</ShowsButton>
                </Link>
              </ShowsContent>
            </ShowsCard>
          </ShowsCards>
        ))}
      </ShowsWrapper>
    </div>
  );
}

export default BannerMovies;
