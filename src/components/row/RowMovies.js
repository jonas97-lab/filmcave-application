import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/row/Row.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backdropImg from 'img/backdrop.jpg';

function RowMovies({ title, fetchData, secondRow }) {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(fetchData);
				setMovies(request.data.results);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, [fetchData]);

	const setImage = (secondRow, movie) => {
		if (secondRow) {
			return imgUrl + movie.poster_path;
		}
		if (movie.backdrop_path) {
			return imgUrl + movie.backdrop_path;
		}
		if (!movie.backdrop_path) {
			return backdropImg;
		}
	};

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	}

	return (
		<motion.div
			className='row'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='row__title row__title--primary'>{title}</h2>
			<div className='row__posters'>
				{movies?.map((movie) => (
					<div key={movie.id}>
						<div
							className={`row__poster ${
								secondRow && 'row__poster row__poster--secondRow'
							}`}
						>
							<Link to={`/movies/${movie.id}`}>
								<img
									className={`row__picture ${
										secondRow
											? 'row__picture row__picture--secondRow'
											: 'row__picture row__picture--otherRows'
									}`}
									src={`${setImage(secondRow, movie)}`}
									alt={movie.title || movie.original_title}
								/>
								<div
									className={`row__overview ${
										secondRow
											? 'row__overview row__overview--secondRow'
											: 'row__overview row__overview--otherRows'
									}`}
								>
									<h3 className='row__title row__title--secondary'>
										{movie.title || movie.original_title}
									</h3>
									<p className='row__description'>
										{truncate(movie.overview, 125)}
									</p>

									<i className='fas fa-angle-down fa-2x'></i>
								</div>
							</Link>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
}

export default RowMovies;
