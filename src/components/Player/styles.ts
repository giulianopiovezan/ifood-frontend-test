import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      flexDirection: 'row-reverse',
      display: 'flex',
      bottom: 0,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      marginTop: 5,
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playPauseIcon: {
      height: 38,
      width: 38,
    },
    cron: {
      position: 'relative',
      marginTop: 10,
    },

    timer: {
      position: 'absolute',
      right: '26%',
      top: '12%',
    },
    closePlayer: {
      position: 'absolute',
      right: 0,
      padding: 0,
    },
  }),
);
