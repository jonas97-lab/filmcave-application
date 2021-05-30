import React from 'react';
import { useTranslation } from 'react-i18next';
import 'components/watchlistButton/WatchlistButton.css';

const RemoveFromWatchlist = () => {
	const { t } = useTranslation();

	return (
		<div className='watchlist'>
			<button className='watchlist__button'>
				{t('button--seven')}
				<i className='fas fa-minus-circle'></i>
			</button>
		</div>
	);
};

export default RemoveFromWatchlist;
