import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import 'components/pagination/Pagination.css';

function Pagination({
	endpointUrl,
	searchFavourites,
	setSearchFavourites,
	setLoading,
}) {
	const { t } = useTranslation();

	const [currentPage, setCurrentPage] = useState(0);

	const fetchSeriesData = useCallback(
		(endpoint) => {
			fetch(endpoint)
				.then((result) => result.json())
				.then((result) => {
					setSearchFavourites(result.results);
					setCurrentPage(result.page);
				}, setLoading(false))
				.catch((error) => console.error('Error:', error));
		},
		[setSearchFavourites, setLoading]
	);

	useEffect(() => {
		const endpoint = `${endpointUrl}${process.env.REACT_APP_THEMOVIEDB_API_KEY}&page=1`;
		fetchSeriesData(endpoint);
	}, [endpointUrl, fetchSeriesData]);

	const nextResults = (endpoint) => {
		endpoint = `${endpointUrl}${
			process.env.REACT_APP_THEMOVIEDB_API_KEY
		}&page=${currentPage + 1}`;
		fetchSeriesData(endpoint);
	};

	const prevResults = (endpoint) => {
		endpoint = `${endpointUrl}${
			process.env.REACT_APP_THEMOVIEDB_API_KEY
		}&page=${currentPage - 1}`;
		fetchSeriesData(endpoint);
	};

	return (
		<div>
			{searchFavourites.length > 0 && (
				<div className='pagination__buttons'>
					{currentPage > 1 && searchFavourites.length <= 20 && (
						<button
							className='pagination__button pagination__button--prev'
							onClick={prevResults}
						>
							<i className='fas fa-arrow-circle-left'></i>
							{t('button--eight')}
						</button>
					)}
					{searchFavourites.length >= 20 && (
						<button
							className='pagination__button pagination__button--next'
							onClick={nextResults}
						>
							{t('button--nine')}
							<i className='fas fa-arrow-circle-right'></i>
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default Pagination;
