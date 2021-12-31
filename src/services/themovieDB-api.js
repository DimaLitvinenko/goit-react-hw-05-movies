import PropTypes from 'prop-types';

// api.themoviedb.org/3/movie/550?api_key = a521a2d303bae2d05d7a95a32fcece9a;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a521a2d303bae2d05d7a95a32fcece9a';
const MediaType = { ALL: 'all', MOVIE: 'movie', TV: 'tv', PERSON: 'person' };
const TimeWindow = { DAY: 'day', WEEK: 'week' };

export function fetchTrending() {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/trending/${MediaType.MOVIE}/${TimeWindow}${searchParams}`);
}

export function fetchMovieQuery(searchQuery) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: searchQuery,
   });

   return fetch(`${BASE_URL}/search/${MediaType.MOVIE}?${searchParams}`);
}
fetchMovieQuery.propTypes = {
   searchQuery: PropTypes.string.isRequired,
};

export function fetchMovieDetails(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}?${searchParams}`);
}
fetchMovieDetails.propTypes = {
   movieId: PropTypes.number.isRequired,
};

export function fetchCast(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}/credits?${searchParams}`);
}
fetchCast.propTypes = {
   movieId: PropTypes.number.isRequired,
};

export function fetchReviews(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}/reviews?${searchParams}`);
}
fetchReviews.propTypes = {
   movieId: PropTypes.number.isRequired,
};
