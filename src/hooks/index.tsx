import React from 'react';

import { PlayerProvider } from './player';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </ToastProvider>
  );
};

export default AppProvider;
