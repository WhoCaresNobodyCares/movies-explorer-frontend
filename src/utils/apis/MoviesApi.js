class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  _handleRes(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: 'GET',
    }).then(res => this._handleRes(res));
  }
}

const { MOVIES_API_URL } = require('../../configs/apiConfig.json');
const moviesApi = new MoviesApi(MOVIES_API_URL);
export default moviesApi;
