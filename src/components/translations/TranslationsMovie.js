import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import 'components/translations/Translations.css';

function TranslationsMovie() {
	const { id } = useParams();
	const { t } = useTranslation();
	let history = useHistory();

	const [translationsMovies, setTranslationsMovies] = useState([]);

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(
					`/movie/${id}/translations?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setTranslationsMovies(request.data.translations);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, [id]);

	function handleClick() {
		history.push(history.goBack());
	}

	return (
		<motion.div
			className='translation'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='translation__title--primary'>
				{t('translations__title')}
			</h2>
			{translationsMovies?.map((translationsMovie, idx) => (
				<div className='translation__show' key={idx}>
					{translationsMovie.data.overview.length > 0 && (
						<>
							<div className='translation__names'>
								<div>{translationsMovie.english_name}/</div>
								<div>{translationsMovie.name}</div>
							</div>
							<h3 className='translation__title--secondary'>
								{translationsMovie.data.name}
							</h3>
							<p>{translationsMovie.data.overview}</p>
						</>
					)}
				</div>
			))}
			<button className='translation__button' onClick={handleClick}>
				<i className='fas fa-arrow-circle-left'></i>
				{t('button--four')}
			</button>
		</motion.div>
	);
}

export default TranslationsMovie;
