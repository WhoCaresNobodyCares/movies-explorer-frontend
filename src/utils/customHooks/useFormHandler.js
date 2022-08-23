import { useCallback, useState } from 'react';

const useFormHandler = () => {
  const [inputValue, setInputValue] = useState([]);

  const prepareValue = (value) =>
    value !== undefined
      ? value
          .replace(/\s+/g, ' ')
          .split(' ')
          .map((item) => item !== '' && item)
          .filter(Boolean)
      : [];

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputValue({ ...inputValue, [name]: prepareValue(value) });
  };

  const resetForm = useCallback(
    (newValue) => {
      setInputValue(newValue);
    },
    [setInputValue]
  );

  return { inputValue, handleInputChange, resetForm };
};

export default useFormHandler;