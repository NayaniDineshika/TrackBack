// src/context/ToastContext.js
import React, { createContext, useState, useCallback } from "react";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 3000);
  }, []);

  const hideToast = () => setToast({ message: "", visible: false });

  const contextValue = React.useMemo(() => ({ ...toast, showToast, hideToast }), [toast, showToast, hideToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
