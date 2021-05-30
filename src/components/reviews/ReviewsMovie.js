import React, { useState, useEffect } from 'react';
import 'components/reviews/Reviews.css';
import { useHistory, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../../axios';
import { useTranslation } from 'react-i18next';

function ReviewsMovie() {
	const { id } = useParams();
	const imgUrl = 'https://image.tmdb.org/t/p/w1280';
	let history = useHistory();
	const { t } = useTranslation();

	const [reviewsMovies, setReviewsMovies] = useState([]);

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const request = await axios.get(
					`/movie/${id}/reviews?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
				);
				setReviewsMovies(request.data.results);
			} catch (err) {
				console.error(err);
			}
		}
		fetchMoviesData();
	}, [id]);

	function handleClick() {
		history.push(history.goBack());
	}

	const setAvatar = (reviewsMovie) => {
		if (
			reviewsMovie.author_details.avatar_path?.startsWith(
				'/https://secure.gravatar.com/avatar'
			)
		) {
			return 'https://bit.ly/3sqhF58';
		}
		if (reviewsMovie.author_details.avatar_path) {
			return imgUrl + reviewsMovie.author_details.avatar_path;
		}

		if (!reviewsMovie.author_details.avatar_path) {
			return 'https://bit.ly/3sqhF58';
		}
	};

	return (
		<motion.div
			className='reviews'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.6 }}
		>
			<h2 className='reviews__title reviews__title--primary'>
				{t('reviews__title')}
			</h2>
			{reviewsMovies.length > 0 ? (
				<>
					{reviewsMovies?.map((reviewsMovie) => (
						<div className='reviews__wrapper'>
							<figure className='reviews__content'>
								<blockquote className='reviews__blockquote'>
									{reviewsMovie.content}
								</blockquote>
								<div className='reviews__author'>
									<img
										className='reviews__picture'
										src={`${setAvatar(reviewsMovie)}`}
										alt={reviewsMovie.name}
									/>
									<h3 className='reviews__username'>
										@{reviewsMovie.author_details.username}
									</h3>
									<p className='reviews__rating'>
										{reviewsMovie.author_details.rating ? (
											reviewsMovie.author_details.rating + '/10'
										) : (
											<p className='reviews__rating'>
												{t('reviews__paragraph')}
											</p>
										)}
									</p>
								</div>
							</figure>
						</div>
					))}
				</>
			) : (
				<h2 className='reviews__title reviews__title--secondary'>
					{t('reviews__heading')}
				</h2>
			)}
			<button className='reviews__button' onClick={handleClick}>
				<i className='fas fa-arrow-circle-left'></i>
				{t('button--four')}
			</button>
		</motion.div>
	);
}

export default ReviewsMovie;
