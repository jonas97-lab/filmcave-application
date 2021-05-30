import React from 'react';
import BannerMovies from 'components/banner/BannerMovies';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('header renders the correct text', () => {
	const { getByTestId } = render(<BannerMovies />);
	const headerEl = getByTestId('header__movies');

	expect(headerEl.textContent).toBe('Trending Movies');
});
