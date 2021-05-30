import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import 'components/cast/Cast.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Cast({ fetchData }) {
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';
	const { t } = useTranslation();

	const [credits, setCredits] = useState([]);
	const [visible, setVisible] = useState(6);

	useEffect(() => {
		async function fetchCastData() {
			const request = await axios.get(fetchData);
			setCredits(request.data.cast);
		}
		fetchCastData();
	}, [fetchData]);

	const showMoreCharacters = () => {
		setVisible((prevNumber) => prevNumber + 6);
	};

	return (
		<motion.div
			className='cast'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.2 }}
		>
			{credits.length > 0 && (
				<>
					<h2 className='cast__title'>{t('show__title--two')}</h2>
					<div className='cast__wrapper'>
						{credits?.slice(0, visible).map((credit) => (
							<div key={credit.id}>
								<div className='cast__member'>
									<img
										className='cast__picture'
										src={
											credit.profile_path
												? imgUrl + credit.profile_path
												: 'https://bit.ly/3v9TucS'
										}
										alt='Character'
									/>
									<h3 className='cast__info'>
										{credit.name || credit.original_name}
									</h3>
								</div>
							</div>
						))}
					</div>
					{credits.length > 6 && (
						<button className='cast__button' onClick={showMoreCharacters}>
							{t('button--two')}
							<i className='fas fa-spinner'></i>
						</button>
					)}
				</>
			)}
		</motion.div>
	);
}

export default Cast;
