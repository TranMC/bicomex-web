import { ConfirmContext } from './ConfirmContextInstance';
import useConfirmEnhanced from '../hooks/useConfirmEnhanced';
import React, { useEffect } from 'react';
import fixScrollPositionOnConfirm from '../utils/fixScrollPositionOnConfirm';

const ConfirmProvider = ({ children }) => {
  const {
    confirm,
    alert
  } = useConfirmEnhanced();

  useEffect(() => {
    const cleanup = fixScrollPositionOnConfirm();
    return () => {
      cleanup();
    };
  }, []);

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