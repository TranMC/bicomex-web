import React from 'react';
import FocusTrap from 'focus-trap-react';

const CustomFocusTrap = ({ children, isActive }) => {
  return (
    <FocusTrap
      focusTrapOptions={{
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        initialFocus: 'button[autoFocus]',
        fallbackFocus: '.react-confirm-alert-button-group button',
        returnFocusOnDeactivate: true,
        preventScroll: true,
        allowOutsideClick: true
      }}
      active={isActive}
    >
      {children}
    </FocusTrap>
  );
};

export default CustomFocusTrap;
