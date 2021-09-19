import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    button: {
      borderRadius: "10px"
    }
  },
  palette: {
    primary: {
      light: "#0066ff",
      main: "#000000"
    },
    secondary: {
      main: "#fafafa",
      contrastText: "#000000"
    },
    background: {
      main: "#afafaf"
    }
  },
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#fafafa"
});
