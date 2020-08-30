/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SpotifoodLogo from 'assets/spotifood.svg';
import Ouvinte from 'assets/vetor-ouvinte.svg';
import { HeaderContainer } from './styles';

const Header: React.FC = () => {
  const theme = useTheme();
  const showImage = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <HeaderContainer>
      <Container maxWidth="lg">
        <Grid container alignItems="center">
          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={12}>
                <img width={270} alt="spotifood-logo" src={SpotifoodLogo} />
              </Grid>
              <Grid item xs={12} md={8}>
                <h2>
                  <strong>Diversas playlists </strong> à serem exploradas
                </h2>
              </Grid>
              <Grid item xs={12}>
                <a href="#playlistFilter">ESCUTE AGORA</a>
              </Grid>
            </Grid>
          </Grid>
          {showImage && (
            <Grid item xs={12} md={7}>
              <img alt="ouvinte-logo" src={Ouvinte} />
            </Grid>
          )}
        </Grid>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
