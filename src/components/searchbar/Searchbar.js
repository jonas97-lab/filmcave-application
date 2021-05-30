import React, { useState } from 'react';
import 'components/searchbar/Searchbar.css';
import { useTranslation } from 'react-i18next';

function Searchbar({ getQuery }) {
	const { t } = useTranslation();
	const [text, setText] = useState('');

	const onChange = (q) => {
		setText(q);
		getQuery(q);
	};

	return (
		<form className='searchbar'>
			<input
				className='searchbar__input'
				type='text'
				placeholder={t('searchbar__text')}
				value={text}
				onChange={(e) => onChange(e.target.value)}
			/>
			<i className='fas fa-search'></i>
		</form>
	);
}

export default Searchbar;
