/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState, useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { mainColor } from 'styles/colors';

import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

import { Container } from './styles';

interface PlayerProps {
  onClose: () => void;
  value: {
    trackName: string;
    album: {
      name: string;
      image: string;
    };
    artists: {
      name: string;
    }[];
    trackSource: string;
  };
}

const Player: React.FC<PlayerProps> = ({
  value: { trackName, album, artists, trackSource },
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const playerRef = React.useRef<HTMLAudioElement>(null);
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const artistsJoined = artists.flatMap(artist => artist.name).join(', ');

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    playerRef.current.load();
    playerRef.current.play();
    setIsPlaying(true);
  }, [trackName]);

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    playerRef.current.ontimeupdate = () => {
      const duration = Math.floor(playerRef.current?.duration || 0);
      const currentTime = Math.floor(playerRef.current?.currentTime || 0);
      const currentProgress = Math.floor(100 - (currentTime / duration) * 100);
      setTime(currentTime);
      setProgress(currentProgress <= 0 ? 100 : currentProgress);
    };
  }, [isPlaying]);

  const handlePlayerActions = useCallback(() => {
    if (!playerRef.current) {
      return;
    }
    setIsPlaying(state => !state);
    if (isPlaying) {
      playerRef.current.pause();
      return;
    }
    playerRef.current.play();
  }, [isPlaying]);

  return (
    <Container container>
      {!isSmallerScreen ? (
        <Grid item xs={6} className="music">
          <div>
            <img alt={album.name} width={64} src={album.image} />
          </div>
          <div className="playPause">
            <IconButton onClick={handlePlayerActions}>
              {isPlaying ? (
                <FaPauseCircle size={30} color={mainColor} />
              ) : (
                <FaPlayCircle size={30} color={mainColor} />
              )}
            </IconButton>
            <div className="timer">
              <span>
                {String(
                  Math.floor(playerRef?.current?.duration || 0) - time,
                ).padStart(2, '0')}
              </span>

              <CircularProgress size={29} variant="static" value={progress} />
            </div>
          </div>
          <div>
            <p>Música</p>
            <strong>{trackName}</strong>
            <span>{artistsJoined}</span>
          </div>
          <div>
            <p>Álbum</p>
            {album.name}
          </div>
          <div>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} className="music">
          <div className="playPause">
            <IconButton onClick={handlePlayerActions}>
              {isPlaying ? (
                <FaPauseCircle size={30} color={mainColor} />
              ) : (
                <FaPlayCircle size={30} color={mainColor} />
              )}
            </IconButton>
          </div>
          <div>
            <strong>{trackName}</strong>
            <span>{artistsJoined}</span>
          </div>

          <div>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </Grid>
      )}

      {/* <Grid item xs={4} md={2} lg={3}>
        <p>Duração</p>
        <span>{transformToMinutesAndSeconds(track.duration_ms)}</span>
      </Grid> */}
      <audio ref={playerRef} style={{ display: 'none' }} controls>
        <source src={trackSource} type="audio/mp3" />
      </audio>
    </Container>
  );
};

export default Player;
