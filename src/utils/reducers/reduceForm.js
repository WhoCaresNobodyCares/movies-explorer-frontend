const reduceForm = (state, action) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return {
        ...state,
        isFormValid: action.payload.isValid,
        [action.payload.name]: action.payload.value,
        [`${action.payload.name}Error`]: action.payload.error,
        [`is${
          action.payload.name.charAt(0).toUpperCase() +
          action.payload.name.slice(1)
        }Valid`]: !action.payload.error ? true : false,
      };
    case 'HANDLE_CHECKBOX':
      return {
        ...state,
        [`is${
          action.payload.name.charAt(0).toUpperCase() +
          action.payload.name.slice(1)
        }Checked`]: action.payload.value,
      };
    case 'HANDLE_SAME':
      return {
        ...state,
        [`is${
          action.payload.name.charAt(0).toUpperCase() +
          action.payload.name.slice(1)
        }Same`]:
          action.payload.value === action.payload.currentName ? true : false,
        [`is${
          action.payload.name.charAt(0).toUpperCase() +
          action.payload.name.slice(1)
        }Changed`]: true,
      };
    case 'HANDLE_DISCARD':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        isNameValid: true,
        isEmailValid: true,
        isNameSame: true,
        isEmailSame: true,
        isEditMode: false,
      };
    case 'UNLOCK_INPUTS':
      return { ...state, isEditMode: action.payload.value };
    case 'RESET_PROFILE':
      return {
        ...state,
        isEditMode: false,
        isFormValid: false,
        isNameSame: true,
        isEmailSame: true,
      };
    case 'UPDATE_CHANGES':
      return {
        value: action.payload.value,
        isCheckboxChecked: action.payload.isCheckboxChecked,
        isFormValid: true,
      };
    default:
      return state;
  }
};

export default reduceForm;
