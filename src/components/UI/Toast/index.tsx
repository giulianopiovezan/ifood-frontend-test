import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useToast } from 'hooks/toast';
import { ToastData } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface ToastProps {
  message: ToastData;
}

const Toast: React.FC<ToastProps> = ({
  message: { description, severity = 'info' },
}) => {
  const classes = useStyles();
  const { close } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 6000);

    return () => clearTimeout(timeout);
  }, [close]);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!description}
        onClose={close}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={close}
          severity={severity}
        >
          {description}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
