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
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  return [values, handleChange, file, handleFile];
};

export default useForm;
