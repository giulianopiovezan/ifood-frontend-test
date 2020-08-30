import React, { createContext, useCallback, useState, useContext } from 'react';

import { Color } from '@material-ui/lab/Alert';

import Toast from 'components/UI/Toast';

interface ToastData {
  severity?: Color;
  description: string;
}

interface ToastContextData {
  show: (message: ToastData) => void;
  close: () => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [toastData, setToastData] = useState<ToastData>({} as ToastData);

  const show = useCallback((message: ToastData) => {
    setToastData(message);
  }, []);

  const close = useCallback(() => {
    setToastData({} as ToastData);
  }, []);

  return (
    <ToastContext.Provider value={{ show, close }}>
      {children}
      {toastData.description && <Toast message={toastData} />}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
