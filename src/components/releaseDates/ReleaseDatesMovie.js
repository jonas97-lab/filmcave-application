import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import 'components/releaseDates/ReleaseDates.css';
import ReactPaginate from 'react-paginate';

function ReleaseDatesMovie() {
	const { id } = useParams();
	const { t } = useTranslation();
	const iso = require('iso-3166-1');

	const [releaseDatesMovies, setReleaseDatesMovies] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(
					`movie/${id}/release_dates?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setReleaseDatesMovies(request.data.results);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, [id]);

	// Pagination
	const releaseDatesPerPage = 30;
	const pagesVisited = pageNumber * releaseDatesPerPage;
	const pageCount = Math.ceil(releaseDatesMovies.length / releaseDatesPerPage);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<motion.div
			className='release'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			<h2 className='release__title'>{t('release__title')}</h2>
			<p className='release__description'>{t('release__paragraph')}</p>
			<table className='release__table'>
				<tr className='release__titles'>
					<td>
						<h3>{t('release__title--country')}</h3>
					</td>
					<td>
						<h3>{t('release__title--date')}</h3>
					</td>
					<td>
						<h3>{t('release__title--note')}</h3>
					</td>
					<td>
						<h3>{t('release__title--type')}</h3>
					</td>
				</tr>
				{releaseDatesMovies
					?.slice(pagesVisited, pagesVisited + releaseDatesPerPage)
					.map((releaseDatesMovie) => (
						<>
							{releaseDatesMovie.release_dates?.map((movie, idx) => (
								<tr key={idx}>
									<td>
										{iso.whereAlpha2(releaseDatesMovie.iso_3166_1)?.country}
									</td>
									<td>{movie.release_date.split('T00:00:00.000Z')}</td>
									<td>{movie.note}</td>
									<td>{movie.type}</td>
								</tr>
							))}
						</>
					))}
			</table>
			<ReactPaginate
				previousLabel={'Previous'}
				nextLabel={'Next'}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={'paginationBttns'}
				activeClassName={'paginationActive'}
				disabledClassName={'paginationDisabled'}
			/>
		</motion.div>
	);
}

export default ReleaseDatesMovie;
