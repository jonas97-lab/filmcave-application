import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import Searchbar from "components/searchbar/Searchbar";
import { useTranslation } from "react-i18next";
import AddToWatchList from "components/watchlistButton/AddToWatchlist";
import spinner from "img/spinner.gif";
import Pagination from "components/pagination/Pagination";
import styled from "styled-components";

const Search = styled.div`
  margin: 20px 40px 0;
`;

const SearchTitlePrimary = styled.h2`
  margin: 60px 20px 40px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const SearchTitleSecondary = styled.h2`
  margin-top: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  font-weight: 400;
  font-size: 1.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;

  @media (max-width: 750px) {
    top: 60%;
  }
`;

const SearchWrapper = styled.div`
  display: grid;
  margin: 40px 0 20px;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SearchPicture = styled.div`
  background-size: cover;
  background-position: center;
  height: 325px;
  width: 225px;
  margin: 10px 15px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  position: relative;
`;

function SearchTVSeries() {
  const { t } = useTranslation();
  const endpointUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=`;

  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSeries, setSearchSeries] = useState([]);

  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const request = await axios.get(
          `/search/tv?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${query}`
        );
        setLoading(false);
        setSearchSeries(request.data.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSeriesData();
  }, [query]);

  useEffect(() => {
    const serieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (serieFavourites) {
      setFavourites(serieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavourite = (serie) => {
    const newFavourites = [...favourites, serie];
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  return (
    <Search>
      <SearchTitlePrimary>{t("search__heading--series")}</SearchTitlePrimary>
      <Searchbar getQuery={(q) => setQuery(q)} />
      <SearchWrapper>
        {searchSeries.length === 0 && (
          <SearchTitleSecondary>{t("search__subtitle")}</SearchTitleSecondary>
        )}
        {loading ? (
          <img
            src={spinner}
            style={{ width: "75px", margin: "auto", display: "block" }}
            alt="spinner"
          />
        ) : (
          searchSeries?.map((searchSerie) => (
            <div key={searchSerie.id}>
              <Link to={`/tv-series/${searchSerie.id}`}>
                <SearchPicture
                  style={{
                    backgroundImage: searchSerie.poster_path
                      ? `url('https://image.tmdb.org/t/p/w1280${searchSerie.poster_path}')`
                      : `url('https://bit.ly/3gRaFw8')`,
                  }}
                >
                  <Link to="#" onClick={() => addFavourite(searchSerie)}>
                    <AddToWatchList />
                  </Link>
                </SearchPicture>
              </Link>
            </div>
          ))
        )}
      </SearchWrapper>
      <Pagination
        endpointUrl={endpointUrl}
        searchFavourites={searchSeries}
        setSearchFavourites={setSearchSeries}
        setLoading={setLoading}
      />
    </Search>
  );
}

export default SearchTVSeries;
