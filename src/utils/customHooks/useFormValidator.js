import { useCallback, useState } from 'react';

const useFormValidator = () => {
  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setInputValues({ ...inputValues, [name]: value });
    setInputErrors({ ...inputErrors, [name]: target.validationMessage });
    setIsFormValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues, newErrors, newIsValid) => {
      setInputValues(newValues);
      setInputErrors(newErrors);
      setIsFormValid(newIsValid);
    },
    [setInputValues, setInputErrors, setIsFormValid]
  );

  return { inputValues, inputErrors, handleInputChange, isFormValid, resetForm };
};

export default useFormValidator;
