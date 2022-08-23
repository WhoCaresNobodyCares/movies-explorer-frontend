class Form {
  constructor() {}

  _innerMethod() {}

  handleRegisterFormSubmit(event, inputValues) {
    event.preventDefault();
    console.log('register');
  }

  handleLoginFormSubmit(event, inputValues) {
    event.preventDefault();
    console.log('login');
  }

  handleProfileFormSubmit(event, inputValues) {
    event.preventDefault();

    console.log('profile');
  }

  handleProfileFormSameNames(event, initialValues, setIsNameSame) {
    if (event.target.value === initialValues.profileFormNameInput || event.target.value === initialValues.profileFormEmailInput) {
      setIsNameSame(true);
    } else {
      setIsNameSame(false);
    }
  }

  handleProfileDiscard(resetForm, setIsProfileEditMode) {
    resetForm({}, {}, false);
    setIsProfileEditMode(false);
  }
}

const form = new Form();
export default form;
