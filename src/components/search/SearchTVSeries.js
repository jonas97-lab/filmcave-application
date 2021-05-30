import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/search/Search.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Searchbar from 'components/searchbar/Searchbar';
import { useTranslation } from 'react-i18next';
import AddToWatchList from 'components/watchlistButton/AddToWatchlist';
import spinner from 'img/spinner.gif';
import Pagination from 'components/pagination/Pagination';

function SearchTVSeries() {
	const { t } = useTranslation();
	const endpointUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=`;

	const [query, setQuery] = useState('');
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
			localStorage.getItem('react-movie-app-favourites')
		);

		if (serieFavourites) {
			setFavourites(serieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavourite = (serie) => {
		const newFavourites = [...favourites, serie];
		setFavourites(newFavourites);
		saveToLocalStorage(newFavourites);
	};

	return (
		<motion.div
			className='search'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='search__title search__title--primary'>
				{t('search__heading--series')}
			</h2>
			<Searchbar getQuery={(q) => setQuery(q)} />
			<div className='search__wrapper'>
				{searchSeries.length === 0 && (
					<h2 className='search__title search__title--secondary'>
						{t('search__subtitle')}
					</h2>
				)}
				{loading ? (
					<img
						src={spinner}
						style={{ width: '75px', margin: 'auto', display: 'block' }}
						alt='spinner'
					/>
				) : (
					searchSeries?.map((searchSerie) => (
						<div key={searchSerie.id}>
							<Link to={`/tv-series/${searchSerie.id}`}>
								<div
									style={{
										backgroundImage: searchSerie.poster_path
											? `url('https://image.tmdb.org/t/p/w1280${searchSerie.poster_path}')`
											: `url('https://bit.ly/3gRaFw8')`,
									}}
									className='search__picture'
								>
									<Link
										to='#'
										onClick={() => addFavourite(searchSerie)}
										className='search__button search__button--add'
									>
										<AddToWatchList />
									</Link>
								</div>
							</Link>
						</div>
					))
				)}
			</div>
			<Pagination
				endpointUrl={endpointUrl}
				searchFavourites={searchSeries}
				setSearchFavourites={setSearchSeries}
				setLoading={setLoading}
			/>
		</motion.div>
	);
}

export default SearchTVSeries;
