const { mainApiUrl } = require('../configs/config.json');

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
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then((res) => this._handleRes(res));
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => this._handleRes(res));
  }

  checkValidity(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: token },
    }).then((res) => this._handleRes(res));
  }
}

const mainApi = new MainApi(mainApiUrl);
export default mainApi;
