import PropTypes from 'prop-types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a521a2d303bae2d05d7a95a32fcece9a';
const MediaType = { ALL: 'all', MOVIE: 'movie', TV: 'tv', PERSON: 'person' };
const TimeWindow = { DAY: 'day', WEEK: 'week' };

// async function fetchWithErrorHandling(
//    url = '',
//    config = {},
//    api_key = 'a521a2d303bae2d05d7a95a32fcece9a',
// ) {
//    const response = await fetch(url, config, api_key);
//    return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
// }

export function fetchTrending() {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(
      `${BASE_URL}/trending/${MediaType.MOVIE}/${TimeWindow.DAY}?${searchParams}`,
   );
}

export function fetchDetails(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}?${searchParams}`);
}
fetchDetails.PropTypes = {
   movieId: PropTypes.number.isRequired,
};

export function fetchCast(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}/credits?${searchParams}`);
}
fetchCast.PropTypes = {
   movieId: PropTypes.number.isRequired,
};

export function fetchReviews(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}/reviews?${searchParams}`);
}
fetchReviews.PropTypes = {
   movieId: PropTypes.number.isRequired,
};

export function fetchMovieByQuery(searchQuery) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: searchQuery,
   });

   return fetch(`${BASE_URL}/search/${MediaType.MOVIE}?${searchParams}`);
}
fetchMovieByQuery.PropTypes = {
   searchQuery: PropTypes.string.isRequired,
};
