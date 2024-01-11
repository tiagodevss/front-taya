import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {

      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 10px #e9e9e9",
          margin: 20,
          backgroundColor: "fff",
          width: "auto",
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 20,
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 8,
          height: 55
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976D2",
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 15
        },
      }
    },
    MuiOutlinedInput:{
      styleOverrides: {
        root: {
          backgroundColor: "#fff"
        },
      }
    },
    MuiFormHelperText:{
      styleOverrides: {
        root: {
          backgroundColor: "#fff"
        },
      }
    }
  },
  typography: {
    fontFamily: 'Roboto',
  }
});

export default theme;