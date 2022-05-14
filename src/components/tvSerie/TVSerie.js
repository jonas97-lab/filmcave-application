import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import Cast from "components/cast/Cast";
import styled from "styled-components";

const Serie = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const SerieTitle = styled.h2`
  margin: 60px 20px 30px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const SerieWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SerieDetails = styled.div`
  display: flex;
  margin: 20px 0 40px 20px;
`;

const SeriePicture = styled.div`
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

const SerieGenres = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #6050dc;
  font-size: 13px;
  padding: 8px 14px;
  color: #fff;
  border-radius: 0.1vw;
  letter-spacing: 1px;
  text-align: center;
`;

const SerieBody = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const SerieContent = styled.div`
  a {
    text-decoration: none;
  }
`;

const SerieRating = styled.div`
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

const SerieTooltipText = styled.span`
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

const SerieTooltip = styled.div`
  position: relative;

  &:hover ${SerieTooltipText} {
    visibility: visible;
  }
`;

const SerieInfo = styled.div`
  font-weight: bold;
  margin-top: 20px;

  span {
    font-weight: 300;
  }
`;

const SerieButton = styled.button`
  padding: 15px 25px;
  outline: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  background-color: #a0a0a0;
  margin: 30px 0;
  border-radius: 0.1vw;

  &:hover {
    background-color: #585858;
  }
`;

const SerieAvailability = styled.p`
  font-weight: 300;
`;

const SerieNetworks = styled.div`
  ul {
    list-style: square;
    margin-left: 20px;
  }

  li {
    font-weight: 300;
    margin: 3px 0;
  }
`;

function TVSerie() {
  const { id } = useParams();
  const { t } = useTranslation();
  const fetchData = `/tv/${id}/credits?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`;

  const [infoSerie, setInfoSerie] = useState([]);
  const [nextEpisode, setNextEpisode] = useState([]);

  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const request = await axios.get(
          `tv/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&append_to_response=watch/providers`
        );
        setInfoSerie(request.data);
        setNextEpisode(request.data.next_episode_to_air);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSeriesData();
  }, [id]);

  // Object entries (TV serie details by id)
  for (const [key, value] of Object.entries(infoSerie)) {
    console.log(`${key} => ${value}`);
  }

  return (
    <Serie>
      <SerieTitle>
        {t("show__title--one")} {infoSerie.name}
      </SerieTitle>
      <SerieWrapper>
        <SerieDetails key={infoSerie.id}>
          <SeriePicture
            style={{
              backgroundImage: infoSerie.poster_path
                ? `url('https://image.tmdb.org/t/p/w1280${infoSerie.poster_path}')`
                : `url('https://bit.ly/3gRaFw8')`,
            }}
          >
            {infoSerie.genres?.slice(0, 1).map((genre, idx) => (
              <SerieGenres key={idx}>
                <div>{genre.name}</div>
              </SerieGenres>
            ))}
          </SeriePicture>
          <SerieBody>
            <SerieContent>
              <SerieTooltip>
                <h1>{infoSerie.name || infoSerie.original_name}</h1>
                <p style={{ fontWeight: "bold" }}>{infoSerie.tagline}</p>
                <SerieRating>
                  <FaStarIcon className="fas fa-star" />
                  {infoSerie.vote_average}
                  <span>/ 10</span>
                </SerieRating>
                <p>{infoSerie.overview}</p>
                <Link to={`/translations-tv-serie/${infoSerie.id}`}>
                  <SerieTooltipText>{t("show__tooltip")}</SerieTooltipText>
                </Link>
              </SerieTooltip>

              <SerieInfo>
                <p>
                  {t("serie__paragraph--one")}:
                  <span> {infoSerie.first_air_date}</span>
                </p>

                <p>
                  {t("serie__paragraph--two")}:
                  <span> {infoSerie.episode_run_time?.slice(0, 1)} min.</span>
                </p>
                {nextEpisode ? (
                  <div key={nextEpisode.id}>
                    <p>
                      {t("serie__paragraph--three")}:
                      <span> {nextEpisode.name}</span>
                    </p>
                    <p>
                      {t("serie__paragraph--four")}:
                      <span> {nextEpisode.air_date}</span>
                    </p>
                    <p>
                      {t("serie__paragraph--five")}:
                      <span>
                        {t("serie__span--one")} {nextEpisode.season_number} &{" "}
                        {t("serie__span--two")} {nextEpisode.episode_number}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p>
                    <p>
                      {t("serie__paragraph--six")}:
                      <span> {infoSerie.status}</span>
                    </p>
                    {t("serie__paragraph--seven")}:
                    <span> {infoSerie.last_air_date}</span>
                  </p>
                )}
                <Link to={`/reviews-tv-serie/${infoSerie.id}`}>
                  <SerieButton>{t("reviews__title")}</SerieButton>
                </Link>
                <SerieAvailability>
                  {infoSerie.name || infoSerie.original_name}{" "}
                  {t("serie__availability")}:
                </SerieAvailability>

                {infoSerie.networks?.map((network) => (
                  <SerieNetworks key={network.id}>
                    <ul>
                      <li>{network.name}</li>
                    </ul>
                  </SerieNetworks>
                ))}
              </SerieInfo>
            </SerieContent>
          </SerieBody>
        </SerieDetails>
        <Cast fetchData={fetchData} />
      </SerieWrapper>
    </Serie>
  );
}

export default TVSerie;
