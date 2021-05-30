import React, { useEffect, useContext } from 'react';
import 'components/watchlist/Watchlist.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import RemoveFromWatchlist from 'components/watchlistButton/RemoveFromWatchlist';
import { MovieContext } from 'components/contexts/MovieContext';
import { Link } from 'react-router-dom';

function Watchlist() {
	const { t } = useTranslation();

	const [favourites, setFavourites] = useContext(MovieContext);

	useEffect(() => {
		const favouriteMovie = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (favouriteMovie) {
			setFavourites(favouriteMovie);
		}
	}, [setFavourites]);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const removeFavourite = (movie) => {
		const newFavourites = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);
		setFavourites(newFavourites);
		saveToLocalStorage(newFavourites);
	};

	return (
		<motion.div
			className='watchlist'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='watchlist__title watchlist__title--primary'>
				{t('nav__link--six')}
			</h2>
			<div className='watchlist__wrapper'>
				{favourites.length > 0 ? (
					<>
						{favourites?.map((favourite) => (
							<div key={favourite.id}>
								<div
									className='watchlist__picture'
									style={{
										backgroundImage: `url('https://image.tmdb.org/t/p/w1280${favourite.poster_path}')`,
									}}
								>
									<Link to='#' onClick={() => removeFavourite(favourite)}>
										<RemoveFromWatchlist />
									</Link>
								</div>
							</div>
						))}
					</>
				) : (
					<h2 className='watchlist__title watchlist__title--secondary'>
						{t('watchlist__title')}
					</h2>
				)}
			</div>
		</motion.div>
	);
}

export default Watchlist;
