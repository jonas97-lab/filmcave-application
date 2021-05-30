import 'App.css';
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import i18n from 'i18n';
import requests from 'requests';
import Header from 'components/header/Header';
import RowMovies from 'components/row/RowMovies';
import RowTVSeries from 'components/row/RowTVSeries';
import Footer from 'components/footer/Footer';
import Movie from 'components/movie/Movie';
import NewMovies from 'components/newContent/NewMovies';
import NewTVEpisodes from 'components/newContent/NewTVEpisodes';
import BannerMovies from 'components/banner/BannerMovies';
import BannerTVSeries from 'components/banner/BannerTVSeries';
import TVSerie from 'components/tvSerie/TVSerie';
import ReviewsMovie from 'components/reviews/ReviewsMovie';
import ReviewsTVSerie from 'components/reviews/ReviewsTVSerie';
import { useTranslation } from 'react-i18next';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from 'themes.js';
import SearchMovies from 'components/search/SearchMovies';
import SearchTVSeries from 'components/search/SearchTVSeries';
import Watchlist from 'components/watchlist/Watchlist';
import ReleaseDatesMovie from 'components/releaseDates/ReleaseDatesMovie';
import { MovieProvider } from 'components/contexts/MovieContext';
import TranslationsMovie from 'components/translations/TranslationsMovie';
import TranslationsTVSerie from 'components/translations/TranslationsTVSerie';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from './userSlice';
import LoginScreen from 'components/login/LoginScreen';

function App() {
	const [theme, setTheme] = useState('light');

	const changeTheme = () => {
		return theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	const { t } = useTranslation();

	const StyledApp = styled.div``;

	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
					})
				);
			} else {
				// Logged out
				dispatch(logout());
			}
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<MovieProvider>
				<GlobalStyles />
				<StyledApp>
					<Router>
						{!user ? (
							<LoginScreen />
						) : (
							<>
								<Header i18n={i18n} changeTheme={changeTheme} />
								<Switch>
									<Route exact path='/'>
										<BannerMovies />
										<RowMovies
											title={t('movies__subtitle--one')}
											fetchData={requests.popularMovies}
											secondRow
										/>
										<RowMovies
											title={t('movies__subtitle--two')}
											fetchData={requests.topRatedMovies}
										/>
										<RowMovies
											title={t('movies__subtitle--three')}
											fetchData={requests.actionMovies}
										/>
										<RowMovies
											title={t('movies__subtitle--four')}
											fetchData={requests.comedyMovies}
										/>
										<RowMovies
											title={t('movies__subtitle--five')}
											fetchData={requests.horrorMovies}
										/>
										<RowMovies
											title={t('movies__subtitle--six')}
											fetchData={requests.romanceMovies}
										/>
										<RowMovies
											title={t('movies__subtitle--seven')}
											fetchData={requests.documentaryMovies}
										/>
									</Route>

									<Route path='/current-tv-series'>
										<BannerTVSeries />
										<RowTVSeries
											title={t('series__subtitle--one')}
											fetchData={requests.popularTVSeries}
											secondRow
										/>
										<RowTVSeries
											title={t('series__subtitle--two')}
											fetchData={requests.topRatedTVSeries}
										/>
										<RowTVSeries
											title={t('series__subtitle--three')}
											fetchData={requests.dramaTVSeries}
										/>
										<RowTVSeries
											title={t('series__subtitle--four')}
											fetchData={requests.crimeTVSeries}
										/>

										<RowTVSeries
											title={t('series__subtitle--five')}
											fetchData={requests.realityTVSeries}
										/>

										<RowTVSeries
											title={t('series__subtitle--six')}
											fetchData={requests.comedyTVSeries}
										/>
										<RowTVSeries
											title={t('series__subtitle--seven')}
											fetchData={requests.familyTVSeries}
										/>
									</Route>

									<Route path='/new-movies-and-tv-series-episodes'>
										<NewMovies />
										<NewTVEpisodes />
									</Route>
									<Route path='/search-a-movie' component={SearchMovies} />
									<Route path='/search-a-tv-serie' component={SearchTVSeries} />
									<Route path='/your-watchlist' component={Watchlist} />
									<Route path='/movies/:id' component={Movie} />
									<Route path='/tv-series/:id' component={TVSerie} />
									<Route
										path='/release-dates-movie/:id'
										component={ReleaseDatesMovie}
									/>

									<Route path='/reviews-movie/:id' component={ReviewsMovie} />
									<Route
										path='/reviews-tv-serie/:id'
										component={ReviewsTVSerie}
									/>
									<Route
										path='/translations-movie/:id'
										component={TranslationsMovie}
									/>
									<Route
										path='/translations-tv-serie/:id'
										component={TranslationsTVSerie}
									/>
									<Redirect to='/' />
								</Switch>

								<Footer />
							</>
						)}
					</Router>
				</StyledApp>
			</MovieProvider>
		</ThemeProvider>
	);
}

export default App;
