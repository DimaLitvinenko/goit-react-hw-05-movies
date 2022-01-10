import PropTypes from 'prop-types';
// import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a521a2d303bae2d05d7a95a32fcece9a';
const Type = { ALL: 'all', MOVIE: 'movie', PERSON: 'person' };
const Time = { DAY: 'day', WEEK: 'week' };

// async function fetchWithErrorHandling(
//    url = '',
//    config = {},
//    api_key = 'a521a2d303bae2d05d7a95a32fcece9a',
// ) {
//    const response = await fetch(url, config, api_key);
//    return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
// }

// export function getTrends() {
//    return axios
//       .get(`${BASE_URL}/trending/${Type.ALL}/${Time.WEEK}?api_key=${API_KEY}`)
//       .then(response => response.data);
// }

export function fetchTrending() {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/trending/${Type.MOVIE}/${Time.DAY}?${searchParams}`);
}

// export function getDetailsById(id) {
//    return axios
//       .get(`${BASE_URL}/${Type.MOVIE}/${id}?api_key=${API_KEY}&language=en-US`)
//       .then(response => response.data);
// }

export function fetchDetails(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${Type.MOVIE}/${movieId}?${searchParams}`);
}
fetchDetails.PropTypes = {
   movieId: PropTypes.number.isRequired,
};

// ====================== CAST
// export function getCreditsById(type, id) {
//    return axios
//       .get(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`)
//       .then(response => response.data);
// }

export function fetchCast(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${Type.MOVIE}/${movieId}/credits?${searchParams}`);
}
fetchCast.PropTypes = {
   movieId: PropTypes.number.isRequired,
};

// export function getReviews(type, id) {
//    return axios
//       .get(`${BASE_URL}/${type}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
//       .then(response => response.data);
// }

export function fetchReviews(movieId) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
   });

   return fetch(`${BASE_URL}/${Type.MOVIE}/${movieId}/reviews?${searchParams}`);
}
fetchReviews.PropTypes = {
   movieId: PropTypes.number.isRequired,
};

// export function getInfoById(type, id) {
//    return axios
//       .get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`)
//       .then(response => response.data);
// }

// export function getInfoByQuerry(query, page = 1) {
//    return axios
//       .get(`${BASE_URL}/search/multi?query=${query}&page=${page}&api_key=${API_KEY}`)
//       .then(response => response.data);
// }

export function fetchMovieByQuery(searchQuery) {
   const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: searchQuery,
   });

   return fetch(`${BASE_URL}/search/${Type.MOVIE}?${searchParams}`);
}
fetchMovieByQuery.PropTypes = {
   searchQuery: PropTypes.string.isRequired,
};
