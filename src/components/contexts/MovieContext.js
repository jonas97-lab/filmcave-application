import React, { useState, createContext } from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
	const [favourites, setFavourites] = useState([]);

	return (
		<MovieContext.Provider value={[favourites, setFavourites]}>
			{props.children}
		</MovieContext.Provider>
	);
};
