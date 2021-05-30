import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/banner/BannerTVSeries';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function BannerMovies() {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';
	const { t } = useTranslation();

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(
					`/trending/movie/day?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setMovies(request.data.results);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	}

	return (
		<motion.div
			className='shows'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			<h2
				className='shows__title shows__title--primary'
				data-testid='header__movies'
			>
				{t('movies__title--one')}
			</h2>
			<div className='shows__wrapper'>
				{movies?.map((movie) => (
					<div className='shows__cards' key={movie.id}>
						<div className='shows__card'>
							<img
								className='shows__picture'
								src={
									movie.backdrop_path
										? imgUrl + movie.backdrop_path
										: 'https://bit.ly/3bIJlgj'
								}
								alt={movie.title || movie.original_title}
							/>
							<div className='shows__content'>
								<h1 className='shows__title shows__title--secondary'>
									{movie.title || movie.original_title}
								</h1>
								<p className='shows__paragraph'>
									{truncate(movie.overview, 200)}
								</p>
								<Link to={`/movies/${movie.id}`}>
									<button className='shows__button'>
										{t('button--three')}
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
}

export default BannerMovies;
