const API_KEY = process.env.REACT_APP_THEMOVIEDB_API_KEY;

const requests = {
	// Movies
	popularMovies: `/movie/popular?api_key=${API_KEY}`,
	topRatedMovies: `/movie/top_rated?api_key=${API_KEY}`,
	actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	documentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

	// TV series
	popularTVSeries: `/tv/popular?api_key=${API_KEY}`,
	topRatedTVSeries: `/tv/top_rated?api_key=${API_KEY}`,
	dramaTVSeries: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
	crimeTVSeries: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
	realityTVSeries: `/discover/tv?api_key=${API_KEY}&with_genres=10764`,
	comedyTVSeries: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
	familyTVSeries: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
};

export default requests;
