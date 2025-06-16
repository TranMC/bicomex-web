import { ConfirmContext } from './ConfirmContextInstance';
import useConfirmEnhanced from '../hooks/useConfirmEnhanced';
import React from 'react';

const ConfirmProvider = ({ children }) => {
  const {
    confirm,
    alert
  } = useConfirmEnhanced();

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        alert
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};

export { ConfirmProvider };

export default ConfirmProvider; 