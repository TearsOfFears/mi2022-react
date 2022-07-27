import { createTheme } from "@mui/material/styles";
import Jost from "./assets/fonts/jost-v14-latin-regular.woff2";

export const themeLight = createTheme({
  palette: {
    background: {
      default: "#F8F8F7"
    }
  }
});

export const theme = createTheme({
  palette: {
    background: {
      default: "#F8F8F7"
    },
    primary: {
      main: '#ff868e',
      light:"#FBE0DC",
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Jost',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Jost';
          font-style: normal;
          font-display: swap;
          src: local('Jost'), url(${Jost}) format('woff2');
        }
      `,
    },
  },
});
