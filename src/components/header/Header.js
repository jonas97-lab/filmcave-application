import React from 'react';
import 'components/header/Header.css';
import { Link } from 'react-router-dom';
import ENFlag from 'img/en-flag.png';
import NLFlag from 'img/nl-flag.png';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from 'userSlice';
import { auth } from '../../firebase';

function Header({ i18n, changeTheme }) {
	const { t } = useTranslation();

	const changeLanguage = (ln) => {
		return () => {
			i18n.changeLanguage(ln);
		};
	};

	const user = useSelector(selectUser);

	return (
		<header className='header'>
			<div className='header__main'>
				<Link to='/' className='header__logo'>
					<i className='fas fa-film fa-3x'></i>
					<p className='header__description'>
						Film<span className='header__span'>Cave</span>
					</p>
				</Link>

				<div className='header__items'>
					<div className='header__icons'>
						<Link to='#' onClick={changeLanguage('en')}>
							<img
								className='header__picture'
								width='27'
								height='25'
								src={ENFlag}
								alt='English flag'
							/>
						</Link>
						<Link to='#' onClick={changeLanguage('nl')}>
							<img
								className='header__picture'
								width='27'
								height='25'
								src={NLFlag}
								alt='Dutch flag'
							/>
						</Link>

						<Link to='#' onClick={() => changeTheme()}>
							<i className='fas fa-toggle-on fa-2x'></i>
						</Link>
					</div>
					<button
						className='header__button'
						to='/'
						onClick={() => auth.signOut()}
					>
						{t('button--one')}
					</button>
				</div>
			</div>

			<nav className='header__sub'>
				<ul className='header__nav'>
					<li className='header__link header__link--active'>
						<Link to='/' className='header__link'>
							{t('nav__link--one')}
						</Link>
					</li>
					<li className='header__link'>
						<Link to='/current-tv-series'>{t('nav__link--two')}</Link>
					</li>
					<li className='header__link'>
						<Link to='/new-movies-and-tv-series-episodes'>
							{t('nav__link--three')}
						</Link>
					</li>
					<li className='header__link'>
						<Link to='/search-a-movie'>{t('nav__link--four')}</Link>
					</li>
					<li className='header__link'>
						<Link to='/search-a-tv-serie'>{t('nav__link--five')}</Link>
					</li>

					<li className='header__link'>
						<Link to='/your-watchlist'>{t('nav__link--six')}</Link>
					</li>
				</ul>
				<p className='header__user'>
					<i className='fas fa-user-circle'></i>
					<span>{user.email}</span>
				</p>
			</nav>
		</header>
	);
}

export default Header;
