import { useState } from 'react';

const useToggle = () => {
  const [isToggle, setToggle] = useState(false);

  const toggle = () => setToggle(!isToggle);

  return { isToggle, toggle };
};

export default useToggle;
