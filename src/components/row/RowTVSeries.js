import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/row/Row.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backdropImg from 'img/backdrop.jpg';

function RowTVSeries({ title, fetchData, secondRow }) {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';

	const [series, setSeries] = useState([]);

	useEffect(() => {
		async function fetchSeriesData() {
			try {
				const request = await axios.get(fetchData);
				setSeries(request.data.results);
			} catch (err) {
				console.error(err);
			}
		}
		fetchSeriesData();
	}, [fetchData]);

	const setImage = (secondRow, serie) => {
		if (secondRow) {
			return imgUrl + serie.poster_path;
		}
		if (serie.backdrop_path) {
			return imgUrl + serie.backdrop_path;
		}
		if (!serie.backdrop_path) {
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
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			<h2 className='row__title row__title--primary'>{title}</h2>
			<div className='row__posters'>
				{series?.map((serie) => (
					<div key={serie.id}>
						<div
							className={`row__poster ${
								secondRow && 'row__poster row__poster--secondRow'
							}`}
						>
							<Link to={`/tv-series/${serie.id}`}>
								<img
									className={`row__picture ${
										secondRow
											? 'row__picture row__picture--secondRow'
											: 'row__picture row__picture--otherRows'
									}`}
									src={`${setImage(secondRow, serie)}`}
									alt={serie.name || serie.original_name}
								/>
								<div
									className={`row__overview ${
										secondRow
											? 'row__overview row__overview--secondRow'
											: 'row__overview row__overview--otherRows'
									}`}
								>
									<h3 className='row__title row__title--secondary'>
										{serie.name || serie.original_name}
									</h3>
									<p className='row__description'>
										{truncate(serie.overview, 125)}
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

export default RowTVSeries;
