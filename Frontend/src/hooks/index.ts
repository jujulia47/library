import { useContext } from 'react';
import { GlobalContext } from '../context/index';

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalStorage');
  }

  return context;
};
