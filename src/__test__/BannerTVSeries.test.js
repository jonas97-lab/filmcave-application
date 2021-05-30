import React from 'react';
import BannerTVSeries from 'components/banner/BannerTVSeries';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('header renders the correct text', () => {
	const { getByTestId } = render(<BannerTVSeries />);
	const headerEl = getByTestId('header__series');

	expect(headerEl.textContent).toBe('Trending TV Series');
});
