import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from 'components/Header';
import AppProvider from 'hooks';
import theme from 'styles/theme';

import PlayList from 'pages/PlayList';

import 'styles/index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Header />
        <Container maxWidth="lg" style={{ marginBottom: 90 }}>
          <PlayList />
        </Container>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
