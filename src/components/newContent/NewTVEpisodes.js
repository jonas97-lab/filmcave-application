import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/newContent/NewContent.css';
import { motion } from 'framer-motion';
import spinner from 'img/spinner.gif';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NewTVSeries() {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';
	const { t } = useTranslation();

	const [newSeries, setNewSeries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchSeriesData() {
			try {
				const request = await axios.get(
					`/tv/on_the_air?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setNewSeries(request.data.results);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		}
		fetchSeriesData();
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
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			<h2 className='card__title card__title--primary'>
				{t('series__title--two')}
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
					{newSeries?.map((newSerie) => (
						<div key={newSerie.id}>
							<div className='card__size'>
								<div className='card__formatter'>
									<div className='card__face card__face--front'>
										<div className='card__label'>
											<span
												className={`card__tag ${setVoteClass(
													newSerie.vote_average
												)}`}
											>
												{newSerie.vote_average}
											</span>
										</div>
										<img
											className='card__picture'
											src={`${imgUrl}${newSerie.poster_path}`}
											alt={newSerie.name || newSerie.original_name}
										/>
									</div>
									<div className='card__face card__face--back'>
										<h1 className='card__title card__title--secondary'>
											{newSerie.name || newSerie.original_name}
										</h1>
										<p className='card__date'>{newSerie.first_air_date}</p>
										<div className='card__description'>
											<div>
												{t('flipcard__heading--one')}: {newSerie.popularity}
											</div>
											<div>
												{t('flipcard__heading--two')} {newSerie.vote_count}{' '}
												{t('flipcard__heading--one')}
											</div>
										</div>
										<div className='card__border'></div>
										<Link
											to={`/tv-series/${newSerie.id}`}
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

export default NewTVSeries;
