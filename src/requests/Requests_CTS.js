
const baseURL = "https://api.themoviedb.org/3";
const API_key = "1fae8a0164087a4bb1e0ee54954324c4";
// Search API
const searchAPI = {
    searchMoviesURL: '/search/movie?',
    getRequestToken: '/authentication/token/new?',
    createSession: '/authentication/session/new?'
};

export default { baseURL, API_key, searchAPI }