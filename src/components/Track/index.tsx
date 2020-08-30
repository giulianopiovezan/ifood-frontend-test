import React, { memo, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';

import { FaPlayCircle } from 'react-icons/fa';

import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { transformToMinutesAndSeconds } from 'utils';

import api from 'services/api';

import { usePlayer } from 'hooks/player';
import { useToast } from 'hooks/toast';

import { mainColor } from 'styles/colors';
import { Container } from './styles';

interface TrackProps {
  track: {
    id: string;
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
  const { play } = usePlayer();
  const { show } = useToast();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const smallerImg =
    track.album.images.find(img => img.width === 64) || track.album.images[0];

  const artists = track.album.artists.flatMap(artist => artist.name).join(', ');

  const handleTrackInfo = useCallback(
    async (trackId: string) => {
      try {
        const response = await api.get<{ preview_url: string }>(
          `tracks/${trackId}`,
        );

        const preview = response.data.preview_url;

        if (preview === null) {
          show({
            severity: 'warning',
            description: 'Prévia indisponível',
          });
          return;
        }
        play({
          album: {
            name: track.album.name,
            image: track.album.images[0].url,
          },
          trackName: track.name,
          artists: track.album.artists,
          trackSource: response.data.preview_url,
        });
      } catch {
        show({
          severity: 'error',
          description: 'Ocorreu um erro ao executar a prévia :(',
        });
      }
    },
    [
      play,
      show,
      track.album.artists,
      track.album.images,
      track.album.name,
      track.name,
    ],
  );

  return (
    <Container container>
      {isSmallerScreen ? (
        <Grid item xs={12} className="details">
          <div>
            <IconButton onClick={() => handleTrackInfo(track.id)}>
              <FaPlayCircle size={30} color={mainColor} />
            </IconButton>
          </div>

          <div className="music">
            <strong>{track.name}</strong>
            <span>{artists}</span>
          </div>

          <div>
            <p>Duração</p>
            <span>{transformToMinutesAndSeconds(track.duration_ms)}</span>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} className="details">
          <div>
            <IconButton onClick={() => handleTrackInfo(track.id)}>
              <FaPlayCircle size={30} color={mainColor} />
            </IconButton>
          </div>

          <div>
            <img
              alt={track.album.name}
              width={smallerImg.width}
              src={smallerImg.url}
            />
          </div>

          <div className="music">
            <p>Música</p>
            <strong>{track.name}</strong>
            <span>{artists}</span>
          </div>
          <div className="album">
            <p>Álbum</p>
            {track.album.name}
          </div>

          <div>
            <p>Duração</p>
            <span>{transformToMinutesAndSeconds(track.duration_ms)}</span>
          </div>
        </Grid>
      )}
    </Container>
  );
};

export default memo(Track);
