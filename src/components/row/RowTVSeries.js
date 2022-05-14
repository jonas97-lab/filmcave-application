import React, { useState, useEffect } from "react";
import axios from "../../axios";
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

function RowTVSeries({ title, fetchData, secondRow }) {
  const imgUrl = "https://image.tmdb.org/t/p/w1280";

  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const request = await axios.get(fetchData);
        setSeries(request.data.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSeriesData();
  }, [fetchData]);

  const setImage = (secondRow, serie) => {
    if (secondRow) {
      return imgUrl + serie.poster_path;
    }
    if (serie.backdrop_path) {
      return imgUrl + serie.backdrop_path;
    }
    if (!serie.backdrop_path) {
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
        {series?.map((serie) => (
          <div key={serie.id}>
            <div
              className={`row__poster ${
                secondRow && "row__poster row__poster--secondRow"
              }`}
            >
              <Link to={`/tv-series/${serie.id}`}>
                <img
                  className={`row__picture ${
                    secondRow
                      ? "row__picture row__picture--secondRow"
                      : "row__picture row__picture--otherRows"
                  }`}
                  src={`${setImage(secondRow, serie)}`}
                  alt={serie.name || serie.original_name}
                />
                <div
                  className={`row__overview ${
                    secondRow
                      ? "row__overview row__overview--secondRow"
                      : "row__overview row__overview--otherRows"
                  }`}
                >
                  <RowTitleSecondary>
                    {serie.name || serie.original_name}
                  </RowTitleSecondary>
                  <RowDescription>
                    {truncate(serie.overview, 125)}
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

export default RowTVSeries;
