import React, { useState, useEffect } from 'react';
import 'components/movie/Movie.css';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useTranslation } from 'react-i18next';
import Cast from 'components/cast/Cast';

function Movie() {
	const { id } = useParams();
	const { t } = useTranslation();
	const fetchData = `/movie/${id}/credits?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`;

	const [infoMovie, setInfoMovie] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(
					`movie/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setInfoMovie(request.data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, [id]);

	// Watch movie trailer
	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie.title || movie.original_title || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((err) => console.log(err));
		}
	};

	// Object entries (movie details by id)
	for (const [key, value] of Object.entries(infoMovie)) {
		console.log(`${key} => ${value}`);
	}

	return (
		<motion.div
			className='movie'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			<h2 className='movie__title'>
				{t('show__title--one')} {infoMovie.title}
			</h2>
			<div className='movie__wrapper'>
				<div className='movie__details' key={infoMovie.id}>
					<div
						style={{
							backgroundImage: infoMovie.poster_path
								? `url('https://image.tmdb.org/t/p/w1280${infoMovie.poster_path}')`
								: `url('https://bit.ly/3gRaFw8')`,
						}}
						className='movie__picture'
					>
						{infoMovie.genres?.slice(0, 1).map((genre, idx) => (
							<div className='movie__genres' key={idx}>
								<div>{genre.name}</div>
							</div>
						))}
					</div>
					<div className='movie__body'>
						<div className='movie__content'>
							<div className='movie__tooltip'>
								<h1>{infoMovie.title || infoMovie.original_title}</h1>
								<p style={{ fontWeight: 'bold' }}>{infoMovie.tagline}</p>

								<div className='movie__rating'>
									<i className='fas fa-star'></i>
									{infoMovie.vote_average}
									<span>/ 10</span>
								</div>
								<p>{infoMovie.overview}</p>
								<Link to={`/translations-movie/${infoMovie.id}`}>
									<span className='movie__tooltiptext'>
										{t('show__tooltip')}
									</span>
								</Link>
							</div>

							<div className='movie__buttons'>
								<Link to={`/reviews-movie/${infoMovie.id}`}>
									<button className='movie__button movie__button--one'>
										{t('reviews__title')}
									</button>
								</Link>

								<button
									className='movie__button movie__button--two'
									onClick={() => handleClick(infoMovie)}
								>
									{t('button--five')}
									<i className='far fa-play-circle'></i>
								</button>
							</div>
							<p className='movie__description'>
								{t('movie__description')}{' '}
								<Link to={`/release-dates-movie/${infoMovie.id}`}>
									{t('movie__description--release')}
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
				<div style={{ marginTop: 20 }}>
					{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
				</div>
				<Cast fetchData={fetchData} />
			</div>
		</motion.div>
	);
}

export default Movie;
