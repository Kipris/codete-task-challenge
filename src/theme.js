import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: blue[200]
        },
    },
});
