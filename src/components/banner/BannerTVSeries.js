import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/banner/Banner.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function BannerTVSeries() {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';
	const { t } = useTranslation();

	const [series, setSeries] = useState([]);

	useEffect(() => {
		async function fetchSeriesData() {
			try {
				const request = await axios.get(
					`/trending/tv/day?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setSeries(request.data.results);
			} catch (err) {
				console.error(err);
			}
		}
		fetchSeriesData();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	}

	return (
		<motion.div
			className='shows'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2
				className='shows__title shows__title--primary'
				data-testid='header__series'
			>
				{t('series__title--one')}
			</h2>
			<div className='shows__wrapper'>
				{series?.map((serie) => (
					<div className='shows__cards' key={serie.id}>
						<div className='shows__card'>
							<img
								className='shows__picture'
								src={
									serie.backdrop_path
										? imgUrl + serie.backdrop_path
										: 'https://bit.ly/3bIJlgj'
								}
								alt={serie.name || serie.original_name}
							/>
							<div className='shows__content'>
								<h1 className='shows__title shows__title--secondary'>
									{serie.name || serie.original_name}
								</h1>
								<p className='shows__paragraph'>
									{truncate(serie.overview, 200)}
								</p>
								<Link to={`/tv-series/${serie.id}`}>
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

export default BannerTVSeries;
