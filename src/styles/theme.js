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
            secondary: "#4A4A4A",
        },
        error: {
            main: "#D32F2F",
        },
        warning: {
            main: "#FFA000",
        },
        info: {
            main: "#0288D1",
        },
        success: {
            main: "#388E3C",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: { fontSize: "2rem", fontWeight: 700 },
        h2: { fontSize: "1.75rem", fontWeight: 700 },
        body1: { fontSize: "1rem" },
        button: { textTransform: "none" },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                },
                textPrimary: {
                    color: "#4A0D0D",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    // padding: "16px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    padding: "1%",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", 
                },
            },
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
            default: "#232323",
            paper: "#232323",
            list: "#232323",
        },
        text: {
            primary: "#E0E0E0",
            secondary: "#B0B0B0",
        },
        error: {
            main: "#EF5350",
        },
        warning: {
            main: "#FFB74D",
        },
        info: {
            main: "#29B6F6",
        },
        success: {
            main: "#66BB6A",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: { fontSize: "2rem", fontWeight: 700 },
        h2: { fontSize: "1.75rem", fontWeight: 700 },
        body1: { fontSize: "1rem", fontWeight: 500 },
        button: { textTransform: "none" },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                },
                textPrimary: {
                    color: "#9A3A3A",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    // padding: "1%",
                    boxShadow: "0px 1px 3px rgba(255, 255, 255, 0.2)", 
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    padding: "1%",
                    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)", 
                },
            },
        },
    },
});
