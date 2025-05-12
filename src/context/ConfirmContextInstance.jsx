import { createContext } from 'react';

// Create the context for confirmation dialogs
export const ConfirmContext = createContext({
  confirm: () => Promise.resolve(false),
  alert: () => Promise.resolve(false)
});
