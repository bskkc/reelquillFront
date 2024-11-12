import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4A0D0D",
        },
        secondary: {
            main: "#5D1A1A",
        },
        background: {
            default: "#EDEDED",
            paper: "#DADADA",
            list: "#EDEDED",
        },
        text: {
            primary: "#1A1A1A",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#9A3A3A",
        },
        secondary: {
            main: "#4A0D0D",
        },
        background: {
            default: "#0E0E0E",
            paper: "#1A1A1A",
            list: "#1A1A1A",
        },
        text: {
            primary: "#E0E0E0",
        },
    },
});
