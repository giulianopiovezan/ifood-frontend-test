import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';

import { FaPlayCircle } from 'react-icons/fa';

import IconButton from '@material-ui/core/IconButton';

import { transformToMinutesAndSeconds } from 'utils';

import { Container } from './styles';

interface TrackProps {
  track: {
    name: string;
    track_number: number;
    album: {
      name: string;
      images: {
        width: number;
        url: string;
      }[];
      artists: {
        name: string;
      }[];
    };
    duration_ms: number;
  };
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const smallerImg =
    track.album.images.find(img => img.width === 64) || track.album.images[0];

  const artists = track.album.artists.flatMap(artist => artist.name).join(', ');

  return (
    <Container container spacing={1}>
      <Grid item xs={2} md={2} lg={1}>
        <IconButton>
          <FaPlayCircle size={30} color="#ea1d2c" />
        </IconButton>
      </Grid>

      <Grid item xs={10} md={4} lg={4} className="music">
        <img
          alt={track.album.name}
          width={smallerImg.width}
          src={smallerImg.url}
        />
        <article>
          <p>Música</p>
          <strong>{track.name}</strong>
          <span>{artists}</span>
        </article>
      </Grid>
      <Grid item xs={8} md={4} lg={3}>
        <p>Álbum</p>
        {track.album.name}
      </Grid>
      <Grid item xs={4} md={2} lg={3}>
        <p>Duração</p>
        <span>{transformToMinutesAndSeconds(track.duration_ms)}</span>
      </Grid>
    </Container>
  );
};

export default memo(Track);
