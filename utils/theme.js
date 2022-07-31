import {createTheme} from "@mui/material/styles";
import {blue, red} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
        secondary: {
            main: blue[500],
        },
    },
});