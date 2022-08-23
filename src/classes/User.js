export class User {
  constructor(
    mainApi,
    setPopupState,
    POPUP_STATES,
    setIsLoggedIn,
    setUserState,
    navigate
  ) {
    this._mainApi = mainApi;
    this._setPopupState = setPopupState;
    this._POPUP_STATES = POPUP_STATES;
    this._setIsLoggedIn = setIsLoggedIn;
    this._setUserState = setUserState;
    this._navigate = navigate;
  }

  // REGISTER

  handleSignup(name, email, password) {
    this._mainApi
      .signup(name, email, password)
      .then(() =>
        this._mainApi
          .signin(email, password)
          .then(
            (res) => res.token && localStorage.setItem('token', `${res.token}`)
          )
          .then(() => this._setIsLoggedIn(true))
          .then(() => this._navigate('/movies'))
          .then(() => this._setPopupState(this._POPUP_STATES.register.success))
          .catch((err) => {
            err === 401 && this._setPopupState(this._POPUP_STATES.login.err401);
            err === 500 && this._setPopupState(this._POPUP_STATES.login.err500);
          })
      )
      .catch((err) => {
        err === 400 && this._setPopupState(this._POPUP_STATES.register.err400);
        err === 409 && this._setPopupState(this._POPUP_STATES.register.err409);
        err === 500 && this._setPopupState(this._POPUP_STATES.register.err500);
      });
  }

  // LOGIN

  handleSignin(email, password) {
    this._mainApi
      .signin(email, password)
      .then((res) => res.token && localStorage.setItem('token', `${res.token}`))
      .then(() => this._setIsLoggedIn(true))
      .then(() => this._navigate('/movies'))
      .then(() => this._setPopupState(this._POPUP_STATES.login.success))
      .catch((err) => {
        err === 401 && this._setPopupState(this._POPUP_STATES.login.err401);
        err === 500 && this._setPopupState(this._POPUP_STATES.login.err500);
      });
  }

  // PROFILE

  handleProfileUpdate(name, email, token) {
    this._mainApi
      .updateUser(name, email, token)
      .then((res) => this._setUserState(res))
      .then(() => this._setPopupState(this._POPUP_STATES.profile.success))
      .catch((err) => {
        err === 409 && this._setPopupState(this._POPUP_STATES.profile.err409);
        err === 500 && this._setPopupState(this._POPUP_STATES.profile.err500);
      });
  }

  handleSignout() {
    localStorage.removeItem('token');
    this._setUserState({});
    this._setIsLoggedIn(false);
    this._navigate('/');
  }

  // VALIDITY

  checkValidity(token) {
    this._mainApi
      .checkValidity(token)
      .then((res) => this._setUserState(res))
      .then(() => this._setIsLoggedIn(true))
      .then(() => this._navigate('/movies'))
      .catch(
        (err) =>
          err === 401 &&
          this._setPopupState(this._POPUP_STATES.tokenValidity.err401)
      );
  }
}
