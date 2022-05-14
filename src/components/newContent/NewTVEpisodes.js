import React, { useState, useEffect } from "react";
import axios from "../../axios";
import spinner from "img/spinner.gif";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { css } from "styled-components";

const Card = styled.div`
  margin: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CardTitlePrimary = styled.h2`
  margin: 60px 20px 15px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const CardWrapper = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0 20px 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardFormatter = styled.div`
  font-family: "Open Sans", sans-serif;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  font-size: 12px;
`;

const CardSize = styled.div`
  width: 250px;
  height: 350px;
  perspective: 20000px;
  margin: 25px 10px 0;
  transition: 1s ease-in-out;

  &:hover ${CardFormatter} {
    transform: rotateY(180deg);
  }
`;

const card = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: center;
`;

const CardFaceFront = styled.div`
  ${card}

  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      226deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.4) 35%,
      rgba(255, 255, 255, 0.2) 42%,
      rgba(255, 255, 255, 0) 60%
    );
  }
`;

const CardFaceBack = styled.div`
  ${card}

  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 15px;
`;

const CardLabel = styled.div`
  font-family: "Poppins", sans-serif;
  position: absolute;
  top: 12px;
  left: 12px;
  background: #0073cf;
  font-size: 14px;
  border-radius: 50%;
  color: #fff;
  display: block;
  width: 2.3rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardPicture = styled.img``;

const CardTitleSecondary = styled.h1`
  color: #3a3a3a;
`;

const CardDate = styled.p`
  color: #a0a0a0;
  margin-top: 1rem;
  font-size: 1em;
  font-weight: 300;
  text-align: center;
  letter-spacing: 1.5px;
`;

const CardDescription = styled.div`
  color: #7c8097;
  font-size: 0.7rem;
  font-weight: 300;
  margin-top: 0.5rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-align: center;

  > div {
    margin-top: 0.5rem;
  }
`;

const CardBorder = styled.div`
  width: 80%;
  height: 1px;
  display: block;
  margin: 1.6em;
  background: #e9eff6;
`;

const CardButton = styled(Link)`
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  background-image: linear-gradient(315deg, #2a2a72 0%, #0073cf 74%);
  width: 130px;
  height: 42px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 70px;
  margin: 10px 0 15px;
  box-shadow: 0 13px 26px rgba(#000, 0.16), 0 3px 6px rgba(#000, 0.16);
  transition: 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NewTVSeries() {
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const { t } = useTranslation();

  const [newSeries, setNewSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const request = await axios.get(
          `/tv/on_the_air?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
        );
        setNewSeries(request.data.results);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSeriesData();
  }, []);

  return (
    <Card>
      <CardTitlePrimary>{t("series__title--two")}</CardTitlePrimary>
      {isLoading ? (
        <img
          src={spinner}
          style={{
            width: "75px",
            marginTop: "60px",
            margin: "auto",
            display: "block",
          }}
          alt="spinner"
        />
      ) : (
        <CardWrapper>
          {newSeries?.map((newSerie) => (
            <div key={newSerie.id}>
              <CardSize>
                <CardFormatter>
                  <CardFaceFront>
                    <CardLabel>
                      <span>{newSerie.vote_average}</span>
                    </CardLabel>
                    <CardPicture
                      src={`${imgUrl}${newSerie.poster_path}`}
                      alt={newSerie.name || newSerie.original_name}
                    />
                  </CardFaceFront>
                  <CardFaceBack>
                    <CardTitleSecondary>
                      {newSerie.name || newSerie.original_name}
                    </CardTitleSecondary>
                    <CardDate>{newSerie.first_air_date}</CardDate>
                    <CardDescription>
                      <div>
                        {t("flipcard__heading--one")}: {newSerie.popularity}
                      </div>
                      <div>
                        {t("flipcard__heading--two")} {newSerie.vote_count}{" "}
                        {t("flipcard__heading--one")}
                      </div>
                    </CardDescription>
                    <CardBorder />
                    <CardButton to={`/tv-series/${newSerie.id}`}>
                      {t("button--three")}
                    </CardButton>
                  </CardFaceBack>
                </CardFormatter>
              </CardSize>
            </div>
          ))}
        </CardWrapper>
      )}
    </Card>
  );
}

export default NewTVSeries;
