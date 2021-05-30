import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import 'components/translations/Translations.css';

function TranslationsTVSerie() {
	const { id } = useParams();
	const { t } = useTranslation();
	let history = useHistory();

	const [translationsSeries, setTranslationsSeries] = useState([]);

	useEffect(() => {
		async function fetchSeriesData() {
			try {
				const request = await axios.get(
					`/tv/${id}/translations?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setTranslationsSeries(request.data.translations);
			} catch (err) {
				console.error(err);
			}
		}
		fetchSeriesData();
	}, [id]);

	function handleClick() {
		history.push(history.goBack());
	}

	return (
		<motion.div
			className='translation'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			<h2 className='translation__title--primary'>
				{t('translations__title')}
			</h2>
			{translationsSeries?.map((translationsSerie, idx) => (
				<div className='translation__show' key={idx}>
					{translationsSerie.data.overview.length > 0 && (
						<>
							<div className='translation__names'>
								<div>{translationsSerie.english_name}/</div>
								<div>{translationsSerie.name}</div>
							</div>
							<h3 className='translation__title--secondary'>
								{translationsSerie.data.name}
							</h3>
							<p>{translationsSerie.data.overview}</p>
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

export default TranslationsTVSerie;
