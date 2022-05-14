import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import RemoveFromWatchlist from "components/watchlistButton/RemoveFromWatchlist";
import { MovieContext } from "components/contexts/MovieContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WatchlistMain = styled.div`
  margin: 20px 40px 0;
`;

const WatchlistTitlePrimary = styled.h2`
  margin: 60px 20px 30px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const WatchlistWrapper = styled.div`
  display: grid;
  margin: 0 20px;
  grid-gap: 10px;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const WatchlistPicture = styled.div`
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  position: relative;
  background-size: cover;
  height: 350px;
  width: 250px;
`;

const WatchlistTitleSecondary = styled.h2`
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
`;

function Watchlist() {
  const { t } = useTranslation();

  const [favourites, setFavourites] = useContext(MovieContext);

  useEffect(() => {
    const favouriteMovie = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (favouriteMovie) {
      setFavourites(favouriteMovie);
    }
  }, [setFavourites]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const removeFavourite = (movie) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  return (
    <WatchlistMain>
      <WatchlistTitlePrimary>{t("nav__link--six")}</WatchlistTitlePrimary>
      <WatchlistWrapper>
        {favourites.length > 0 ? (
          <>
            {favourites?.map((favourite) => (
              <div key={favourite.id}>
                <WatchlistPicture
                  style={{
                    backgroundImage: favourite.poster_path
                      ? `url('https://image.tmdb.org/t/p/w1280${favourite.poster_path}')`
                      : `url('https://bit.ly/3gRaFw8')`,
                  }}
                >
                  <Link to="#" onClick={() => removeFavourite(favourite)}>
                    <RemoveFromWatchlist />
                  </Link>
                </WatchlistPicture>
              </div>
            ))}
          </>
        ) : (
          <WatchlistTitleSecondary>
            {t("watchlist__title")}
          </WatchlistTitleSecondary>
        )}
      </WatchlistWrapper>
    </WatchlistMain>
  );
}

export default Watchlist;
