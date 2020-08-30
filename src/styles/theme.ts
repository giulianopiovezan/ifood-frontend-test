import { createMuiTheme } from '@material-ui/core/styles';

import { mainColor } from './colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: mainColor,
      contrastText: '#fff',
    },
  },
});
