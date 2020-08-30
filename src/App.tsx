import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from 'components/Header';
import { PlayerProvider } from 'hooks/player';
import theme from 'styles/theme';

import PlayList from 'pages/PlayList';

import 'styles/index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <PlayerProvider>
        <Header />
        <Container maxWidth="lg">
          <PlayList />
        </Container>
      </PlayerProvider>
    </ThemeProvider>
  );
};

export default App;
