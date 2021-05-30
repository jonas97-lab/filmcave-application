import React from 'react';
import { useTranslation } from 'react-i18next';
import 'components/watchlistButton/WatchlistButton.css';

const RemoveFromWatchlist = () => {
	const { t } = useTranslation();

	return (
		<div className='watchlist'>
			<button className='watchlist__button'>
				{t('button--six')}
				<i className='fas fa-plus-circle'></i>
			</button>
		</div>
	);
};

export default RemoveFromWatchlist;
