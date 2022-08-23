class Form {
  constructor() {}

  _innerMethod() {}

  // REGISTER

  handleRegisterFormSubmit(event, inputValues) {
    event.preventDefault();
    console.log('register');
  }

  // LOGIN

  handleLoginFormSubmit(event, inputValues) {
    event.preventDefault();
    console.log('login');
  }

  // PROFILE

  handleProfileFormSubmit(event, inputValues) {
    event.preventDefault();

    console.log('profile');
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

  handleProfileDiscard(resetForm, setIsProfileEditMode) {
    resetForm({}, {}, false);
    setIsProfileEditMode(false);
  }

  // SEARCHFORM

  handleSearchFormSubmit(event, inputValue) {
    event.preventDefault();
    console.log('search-form');
    console.log(inputValue);
  }

  handleCheckBoxChange(event, inputValue) {
    console.log('checkbox')
  }
}

const form = new Form();
export default form;
