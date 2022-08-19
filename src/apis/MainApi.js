const { MAIN_API_URL } = require('../configs/apiConfig.json');

class MainApi {
  constructor(url) {
    this._url = url;
  }

  _handleRes(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  signup(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._handleRes(res));
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._handleRes(res));
  }

  checkTokenValidity(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: token },
    }).then((res) => this._handleRes(res));
  }

  updateUser(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ name, email }),
    }).then((res) => this._handleRes(res));
  }

  getMovies(token) {
    return fetch(`${this._url}/movies/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: token },
    }).then((res) => this._handleRes(res));
  }
}

const mainApi = new MainApi(MAIN_API_URL);
export default mainApi;
