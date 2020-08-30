/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';

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
  const classes = useStyles();
  const playerRef = React.useRef<HTMLAudioElement>(null);

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
    <Card className={classes.root}>
      <div className={classes.details}>
        <IconButton className={classes.closePlayer} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {trackName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {artistsJoined}
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            display="block"
            className={classes.cron}
          >
            <span className={classes.timer}>
              {String(
                Math.floor(playerRef?.current?.duration || 0) - time,
              ).padStart(2, '0')}
            </span>

            <CircularProgress variant="static" value={progress} />
          </Typography>
          <IconButton aria-label="play/pause" onClick={handlePlayerActions}>
            {!isPlaying ? (
              <PlayArrowIcon className={classes.playPauseIcon} />
            ) : (
              <PauseIcon className={classes.playPauseIcon} />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={album.image}
        title={album.name}
      />

      <audio ref={playerRef} style={{ display: 'none' }} controls>
        <source src={trackSource} type="audio/mp3" />
      </audio>
    </Card>
  );
};

export default Player;
