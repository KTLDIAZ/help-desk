import { useState } from "react";

export const useForm = (formValues) => {
  const [formState, setFormState] = useState(formValues);

  const handleChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setFormState(formValues);
  };

  return [formState, handleChange, reset];
};
