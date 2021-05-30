import React from 'react';
import 'components/footer/Footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<p className='footer__paragraph'>
				Copyright &copy; {new Date().getFullYear()} FilmCave, Inc. All Rights
				Reserved
			</p>
		</footer>
	);
}

export default Footer;
