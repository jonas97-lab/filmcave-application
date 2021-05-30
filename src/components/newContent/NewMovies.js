import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/newContent/NewContent.css';
import { motion } from 'framer-motion';
import spinner from 'img/spinner.gif';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NewMovies() {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';
	const { t } = useTranslation();

	const [newMovies, setNewMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(
					`/movie/upcoming?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setNewMovies(request.data.results);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, []);

	const setVoteClass = (vote) => {
		if (vote >= 8) {
			return 'green';
		} else if (vote >= 6) {
			return 'yellow';
		} else {
			return 'red';
		}
	};

	return (
		<motion.div
			className='card'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='card__title card__title--primary'>
				{t('movies__title--two')}
			</h2>
			{isLoading ? (
				<img
					src={spinner}
					style={{
						width: '75px',
						marginTop: '60px',
						margin: 'auto',
						display: 'block',
					}}
					alt='spinner'
				/>
			) : (
				<div className='card__wrapper'>
					{newMovies?.map((newMovie) => (
						<div key={newMovie.id}>
							<div className='card__size'>
								<div className='card__formatter'>
									<div className='card__face card__face--front'>
										<div className='card__label'>
											<span
												className={`card__tag ${setVoteClass(
													newMovie.vote_average
												)}`}
											>
												{newMovie.vote_average}
											</span>
										</div>
										<img
											className='card__picture'
											src={`${imgUrl}${newMovie.poster_path}`}
											alt={newMovie.title || newMovie.original_title}
										/>
									</div>
									<div className='card__face card__face--back'>
										<h1 className='card__title card__title--secondary'>
											{newMovie.title || newMovie.original_title}
										</h1>
										<p className='card__date'>{newMovie.release_date}</p>
										<div className='card__description'>
											<div>
												{t('flipcard__heading--one')}: {newMovie.popularity}
											</div>
											<div>
												{t('flipcard__heading--two')} {newMovie.vote_count}{' '}
												{t('flipcard__heading--one')}
											</div>
										</div>
										<div className='card__border'></div>
										<Link
											to={`/movies/${newMovie.id}`}
											className='card__button'
										>
											{t('button--three')}
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
}

export default NewMovies;
