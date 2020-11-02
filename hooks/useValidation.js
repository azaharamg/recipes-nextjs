import { useState, useEffect } from 'react';

const useValidation = (initialState, validation, actionFn) => {
  const [values, storeValues] = useState(initialState);
  const [errors, storeErrors] = useState({});
  const [submitForm, storeSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const success = Object.keys(errors).length === 0;

      if (success) {
        actionFn();
      }
      storeSubmitForm(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    storeValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validation(values);
    storeErrors(validationError);
    storeSubmitForm(true);
  };

  const handleBlur = () => {
    const validationError = validation(values);
    storeErrors(validationError);
  };

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidation;
