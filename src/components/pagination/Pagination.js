import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { css } from "styled-components";

const PaginationButtons = styled.div`
  display: flex;
  margin-left: 20px;
`;

const button = css`
  padding: 15px 20px;
  outline: none;
  color: #fff;
  background-color: #0073cf;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.1vw;

  &:hover {
    background-color: #0f52b9;
  }
`;

const PaginationButtonPrev = styled.button`
  ${button}

  margin-right: 10px;
`;

const PaginationButtonNext = styled.button`
  ${button}
`;

const FaArrowCircleRightIcon = styled.i`
  margin-left: 10px;
`;

function Pagination({
  endpointUrl,
  searchFavourites,
  setSearchFavourites,
  setLoading,
}) {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(0);

  const fetchSeriesData = useCallback(
    (endpoint) => {
      fetch(endpoint)
        .then((result) => result.json())
        .then((result) => {
          setSearchFavourites(result.results);
          setCurrentPage(result.page);
        }, setLoading(false))
        .catch((error) => console.error("Error:", error));
    },
    [setSearchFavourites, setLoading]
  );

  useEffect(() => {
    const endpoint = `${endpointUrl}${process.env.REACT_APP_THEMOVIEDB_API_KEY}&page=1`;
    fetchSeriesData(endpoint);
  }, [endpointUrl, fetchSeriesData]);

  const nextResults = (endpoint) => {
    endpoint = `${endpointUrl}${
      process.env.REACT_APP_THEMOVIEDB_API_KEY
    }&page=${currentPage + 1}`;
    fetchSeriesData(endpoint);
  };

  const prevResults = (endpoint) => {
    endpoint = `${endpointUrl}${
      process.env.REACT_APP_THEMOVIEDB_API_KEY
    }&page=${currentPage - 1}`;
    fetchSeriesData(endpoint);
  };

  return (
    <div>
      {searchFavourites.length > 0 && (
        <PaginationButtons>
          {currentPage > 1 && searchFavourites.length <= 20 && (
            <PaginationButtonPrev
              className="pagination__button pagination__button--prev"
              onClick={prevResults}
            >
              <i className="fas fa-arrow-circle-left" />
              {t("button--eight")}
            </PaginationButtonPrev>
          )}
          {searchFavourites.length >= 20 && (
            <PaginationButtonNext
              className="pagination__button pagination__button--next"
              onClick={nextResults}
            >
              {t("button--nine")}
              <FaArrowCircleRightIcon className="fas fa-arrow-circle-right" />
            </PaginationButtonNext>
          )}
        </PaginationButtons>
      )}
    </div>
  );
}

export default Pagination;
