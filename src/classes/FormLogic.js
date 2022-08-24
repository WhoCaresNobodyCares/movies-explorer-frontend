export class FormLogic {
  constructor(userLogic, moviesLogic, setPopupState, POPUP_STATES) {
    this._userLogic = userLogic;
    this._moviesLogic = moviesLogic;
    this._setPopupState = setPopupState;
    this._POPUP_STATES = POPUP_STATES;
  }

  _innerMethod() {}

  // REGISTER

  handleRegisterFormSubmit(event, inputValues) {
    event.preventDefault();
    if (
      inputValues.registerFormNameInput &&
      inputValues.registerFormEmailInput &&
      inputValues.registerFormPasswordInput
    ) {
      const [name, email, password] = [
        inputValues.registerFormNameInput,
        inputValues.registerFormEmailInput,
        inputValues.registerFormPasswordInput,
      ];
      this._userLogic.handleSignup(name, email, password);
    } else {
      this._setPopupState(this._POPUP_STATES.register.noInput);
    }
  }

  // LOGIN

  handleLoginFormSubmit(event, inputValues) {
    event.preventDefault();
    if (inputValues.loginFormEmailInput && inputValues.loginFormPasswordInput) {
      const [email, password] = [
        inputValues.loginFormEmailInput,
        inputValues.loginFormPasswordInput,
      ];
      this._userLogic.handleSignin(email, password);
    } else {
      this._setPopupState(this._POPUP_STATES.login.noInput);
    }
  }

  // PROFILE

  handleProfileFormSubmit(
    event,
    inputValues,
    token,
    setIsProfileEditMode,
    resetForm,
    setInitialValues,
    userState
  ) {
    event.preventDefault();
    if (
      inputValues.profileFormNameInput &&
      inputValues.profileFormEmailInput &&
      token
    ) {
      const [name, email] = [
        inputValues.profileFormNameInput,
        inputValues.profileFormEmailInput,
      ];
      this._userLogic.handleProfileUpdate(
        name,
        email,
        token,
        setIsProfileEditMode,
        resetForm,
        setInitialValues,
        userState
      );
    } else {
      this._setPopupState(this._POPUP_STATES.profile.noInput);
    }
  }

  handleProfileFormSameNames(event, initialValues, setIsNameSame) {
    if (
      event.target.value === initialValues.profileFormNameInput ||
      event.target.value === initialValues.profileFormEmailInput
    ) {
      setIsNameSame(true);
    } else {
      setIsNameSame(false);
    }
  }

  handleProfileDiscard(
    resetForm,
    userState,
    setProfileApiError,
    setIsProfileEditMode
  ) {
    resetForm(
      {
        profileFormNameInput: userState.name,
        profileFormEmailInput: userState.email,
      },
      {},
      false
    );
    setProfileApiError('');
    setIsProfileEditMode(false);
  }

  // SEARCHFORM

  handleSearchFormSubmit(
    event,
    inputValue,
    isCheckboxChecked,
    state,
    token,
    path
  ) {
    event.preventDefault();

    if (inputValue.searchFormInput.length !== 0) {
      const [words] = [inputValue.searchFormInput];
      this._moviesLogic.handleSearch(
        words,
        isCheckboxChecked,
        state,
        token,
        path
      );
    } else {
      this._setPopupState(this._POPUP_STATES.movies.noInput);
    }
  }

  handleCheckBoxChange(event, setIsCheckboxChecked) {
    setIsCheckboxChecked(event.target.checked);
  }
}
