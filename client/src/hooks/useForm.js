import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFile = (event) => {
    const { files } = event.target;
    setFile(files[0]);
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, file, handleFile, resetForm };
};

export default useForm;
