import React, { useState, useEffect } from 'react';
import 'components/tvSerie/TVSerie.css';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Cast from 'components/cast/Cast';

function TVSerie() {
	const { id } = useParams();
	const { t } = useTranslation();
	const fetchData = `/tv/${id}/credits?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`;

	const [infoSerie, setInfoSerie] = useState([]);
	const [nextEpisode, setNextEpisode] = useState([]);

	useEffect(() => {
		async function fetchSeriesData() {
			try {
				const request = await axios.get(
					`tv/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&append_to_response=watch/providers`
				);
				setInfoSerie(request.data);
				setNextEpisode(request.data.next_episode_to_air);
			} catch (err) {
				console.error(err);
			}
		}
		fetchSeriesData();
	}, [id]);

	// Object entries (TV serie details by id)
	for (const [key, value] of Object.entries(infoSerie)) {
		console.log(`${key} => ${value}`);
	}

	return (
		<motion.div
			className='serie'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='movie__title'>
				{t('show__title--one')} {infoSerie.name}
			</h2>
			<div className='serie__wrapper'>
				<div className='serie__details' key={infoSerie.id}>
					<div
						style={{
							backgroundImage: infoSerie.poster_path
								? `url('https://image.tmdb.org/t/p/w1280${infoSerie.poster_path}')`
								: `url('https://bit.ly/3gRaFw8')`,
						}}
						className='serie__picture'
					>
						{infoSerie.genres?.slice(0, 1).map((genre, idx) => (
							<div className='serie__genres' key={idx}>
								<div>{genre.name}</div>
							</div>
						))}
					</div>
					<div className='serie__body'>
						<div className='serie__content'>
							<div className='serie__tooltip'>
								<h1>{infoSerie.name || infoSerie.original_name}</h1>
								<p style={{ fontWeight: 'bold' }}>{infoSerie.tagline}</p>
								<div className='serie__rating'>
									<i className='fas fa-star'></i>
									{infoSerie.vote_average}
									<span>/ 10</span>
								</div>
								<p>{infoSerie.overview}</p>
								<Link to={`/translations-tv-serie/${infoSerie.id}`}>
									<span className='serie__tooltiptext'>
										{t('show__tooltip')}
									</span>
								</Link>
							</div>

							<div className='serie__info'>
								<p>
									{t('serie__paragraph--one')}:
									<span> {infoSerie.first_air_date}</span>
								</p>

								<p>
									{t('serie__paragraph--two')}:
									<span> {infoSerie.episode_run_time?.slice(0, 1)} min.</span>
								</p>
								{nextEpisode ? (
									<div key={nextEpisode.id}>
										<p>
											{t('serie__paragraph--three')}:
											<span> {nextEpisode.name}</span>
										</p>
										<p>
											{t('serie__paragraph--four')}:
											<span> {nextEpisode.air_date}</span>
										</p>
										<p>
											{t('serie__paragraph--five')}:
											<span>
												{' '}
												{t('serie__span--one')} {nextEpisode.season_number} &{' '}
												{t('serie__span--two')} {nextEpisode.episode_number}
											</span>
										</p>
									</div>
								) : (
									<p>
										<p>
											{t('serie__paragraph--six')}:
											<span> {infoSerie.status}</span>
										</p>
										{t('serie__paragraph--seven')}:
										<span> {infoSerie.last_air_date}</span>
									</p>
								)}
								<Link to={`/reviews-tv-serie/${infoSerie.id}`}>
									<button className='serie__button'>
										{t('reviews__title')}
									</button>
								</Link>
								<p className='serie__availability'>
									{infoSerie.name || infoSerie.original_name}{' '}
									{t('serie__availability')}:
								</p>

								{infoSerie.networks?.map((network) => (
									<div className='serie__networks' key={network.id}>
										<ul>
											<li>{network.name}</li>
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<Cast fetchData={fetchData} />
			</div>
		</motion.div>
	);
}

export default TVSerie;
