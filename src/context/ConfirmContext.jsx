import { ConfirmContext } from './ConfirmContextInstance';
import useConfirm from '../hooks/useConfirm';
import React from 'react';

const ConfirmProvider = ({ children }) => {
  const {
    confirm,
    alert
  } = useConfirm();

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