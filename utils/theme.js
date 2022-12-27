import {createTheme} from "@mui/material/styles";
import {blue, red, yellow} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: yellow[500],
        },
        secondary: {
            main: blue[500],
        },
    },
});
