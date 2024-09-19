import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { reduxSliceData } from '@/utils/redux/features/reduxData';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      dispatch(reduxSliceData({ key: 'theme', data: 'dark' }));

      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      dispatch(reduxSliceData({ key: 'theme', data: 'light' }));

      setIsDarkMode(false);
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      dispatch(reduxSliceData({ key: 'theme', data: 'light' }));
    } else {
      dispatch(reduxSliceData({ key: 'theme', data: 'dark' }));
      localStorage.theme = 'dark';

      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkMode;
