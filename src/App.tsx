import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from 'components/Header';
import theme from 'styles/theme';

import PlayList from 'pages/PlayList';

import 'styles/index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="lg">
        <PlayList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
