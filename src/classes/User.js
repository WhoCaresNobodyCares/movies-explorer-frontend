export class User {
  constructor(
    mainApi,
    setPopupState,
    setRegisterApiError,
    setLoginApiError,
    setProfileApiError,
    POPUP_STATES,
    API_ERRORS,
    setIsLoggedIn,
    setUserState,
    navigate
  ) {
    this._mainApi = mainApi;
    this._setPopupState = setPopupState;
    this._setRegisterApiError = setRegisterApiError;
    this._setLoginApiError = setLoginApiError;
    this._setProfileApiError = setProfileApiError;
    this._POPUP_STATES = POPUP_STATES;
    this._API_ERRORS = API_ERRORS;
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
          .then(() => this._navigate('/movies'))
          .then(() => this._setIsLoggedIn(true))
          .then(() => this._setPopupState(this._POPUP_STATES.register.success))
          .catch((err) => {
            if (err === 401) {
              throw 401;
            } else if (err === 500) {
              throw 500;
            } else {
              console.log(err);
            }
          })
      )
      .catch((err) => {
        err === 400 &&
          this._setRegisterApiError(this._API_ERRORS.register.err400);
        err === 401 &&
          this._setRegisterApiError(this._API_ERRORS.register.err401);
        err === 409 &&
          this._setRegisterApiError(this._API_ERRORS.register.err409);
        err === 500 &&
          this._setRegisterApiError(this._API_ERRORS.register.err500);
      });
  }

  // LOGIN

  handleSignin(email, password) {
    this._mainApi
      .signin(email, password)
      .then((res) => res.token && localStorage.setItem('token', `${res.token}`))
      .then(() => this._navigate('/movies'))
      .then(() => this._setIsLoggedIn(true))
      .then(() => this._setPopupState(this._POPUP_STATES.login.success))
      .catch((err) => {
        err === 401 && this._setLoginApiError(this._API_ERRORS.login.err401);
        err === 500 && this._setLoginApiError(this._API_ERRORS.login.err500);
      });
  }

  // PROFILE

  handleProfileUpdate(
    name,
    email,
    token,
    setIsProfileEditMode,
    resetForm,
    setInitialValues,
    userState
  ) {
    this._mainApi
      .updateUser(name, email, token)
      .then((res) => this._setUserState(res))
      .then(() => this._setPopupState(this._POPUP_STATES.profile.success))
      .then(() => setIsProfileEditMode(false))
      .catch((err) => {
        err === 409 &&
          this._setProfileApiError(this._API_ERRORS.profile.err409);
        err === 500 &&
          this._setProfileApiError(this._API_ERRORS.profile.err500);
      })
      .finally(() => {
        resetForm(
          {
            profileFormNameInput: userState.name,
            profileFormEmailInput: userState.email,
          },
          {},
          false
        );
        setInitialValues({
          profileFormNameInput: userState.name,
          profileFormEmailInput: userState.email,
        });
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
      .then((res) => {
        this._setUserState(res);
        return res;
      })
      .then((res) => {
        const user = res;
        if (localStorage.getItem(`${user.email}-state`) === null) {
          this._mainApi
            .getMovies(token)
            .then((res) => {
              localStorage.setItem(
                `${user.email}-state`,
                JSON.stringify({
                  allCards: [],
                  savedCards: res,
                  moviesState: {
                    inputValue: {
                      searchFormInput: ['Фильмы'],
                    },
                    initialValue: {
                      searchFormInput: 'Фильмы',
                    },
                    isCheckboxChecked: false,
                    lastFoundMovies: [],
                  },
                  savedMoviesState: {
                    inputValue: {
                      searchFormInput: ['Сохраненные', 'фильмы'],
                    },
                    initialValue: {
                      searchFormInput: 'Сохраненные фильмы',
                    },
                    isCheckboxChecked: false,
                    lastFoundMovies: res,
                  },
                })
              );
            })
            .catch(
              (err) =>
                err === 500 &&
                this._setPopupState(this._POPUP_STATES.movies.err500)
            );
        } else {
          console.log('localStorage has such item');
        }
      })
      .then(() => this._navigate('/movies'))
      .then(() => this._setIsLoggedIn(true))
      .catch(
        (err) =>
          err === 401 &&
          this._setPopupState(this._POPUP_STATES.tokenValidity.err401)
      );
  }
}
