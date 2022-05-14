import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import "components/releaseDates/ReleaseDates.css";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const Release = styled.div`
  padding: 20px;
`;

const ReleaseTitle = styled.h2`
  margin: 60px 20px 30px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ReleaseDescription = styled.p`
  margin: 60px 40px 50px;
`;

const ReleaseTable = styled.table`
  border-collapse: collapse;
  width: 95%;
  margin: 0 auto 50px;

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
`;

const ReleaseTitles = styled.tr`
  background-color: #00000003;
`;

function ReleaseDatesMovie() {
  const { id } = useParams();
  const { t } = useTranslation();
  const iso = require("iso-3166-1");

  const [releaseDatesMovies, setReleaseDatesMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const request = await axios.get(
          `movie/${id}/release_dates?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
        );
        setReleaseDatesMovies(request.data.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoviesData();
  }, [id]);

  // Pagination
  const releaseDatesPerPage = 30;
  const pagesVisited = pageNumber * releaseDatesPerPage;
  const pageCount = Math.ceil(releaseDatesMovies.length / releaseDatesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Release>
      <ReleaseTitle>{t("release__title")}</ReleaseTitle>
      <ReleaseDescription>{t("release__paragraph")}</ReleaseDescription>
      <ReleaseTable>
        <ReleaseTitles>
          <td>
            <h3>{t("release__title--country")}</h3>
          </td>
          <td>
            <h3>{t("release__title--date")}</h3>
          </td>
          <td>
            <h3>{t("release__title--note")}</h3>
          </td>
          <td>
            <h3>{t("release__title--type")}</h3>
          </td>
        </ReleaseTitles>
        {releaseDatesMovies
          ?.slice(pagesVisited, pagesVisited + releaseDatesPerPage)
          .map((releaseDatesMovie) => (
            <>
              {releaseDatesMovie.release_dates?.map((movie, idx) => (
                <tr key={idx}>
                  <td>
                    {iso.whereAlpha2(releaseDatesMovie.iso_3166_1)?.country}
                  </td>
                  <td>{movie.release_date.split("T00:00:00.000Z")}</td>
                  <td>{movie.note}</td>
                  <td>{movie.type}</td>
                </tr>
              ))}
            </>
          ))}
      </ReleaseTable>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        activeClassName={"paginationActive"}
        disabledClassName={"paginationDisabled"}
      />
    </Release>
  );
}

export default ReleaseDatesMovie;
