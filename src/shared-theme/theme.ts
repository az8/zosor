
      // mui 5 getdesignToken function
import { ThemeOptions } from '@mui/material/styles'
export const a = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#c2b298',
            contrastText: '#1b1b1b',
          },
          secondary: {
            main: '#678087',
            contrastText: '#333',
          },
          drawerListitem: {
            main: ' #fff',
            contrastText: '#1b1b1b',
            background: '#1b1b1b',
            neutral: '#888',
            selected: '#2196F3',
          },
          selected: {
            main: '#c2b298',
            contrast: '#1b1b1b',
            background: 'rgba(0,0,0,0.1)',
          },
          paper: {
            main: '#ccc',
            mode: '#fbfaf9',
          },
          table: {
            header1: '#ddd4c5',
            header2: '#e4ddd2',
            cell1: '#f4f1ec',
            cell2: '#fbfaf9',
            info: '#fff3e0',
            text: '#111',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#c2b298',
            contrastText: '#1b1b1b',
          },
          secondary: {
            main: '#678087',
            contrastText: '#ccc',
          },
          drawerListitem: {
            main: '#1b1b1b',
            contrastText: '#fff',
            background: '#c2b298',
            neutral: '#bbb',
            selected: '#2196F3',
          },
          selected: {
            main: '#1b1b1b',
            contrast: '#c2b298',
            background: 'rgba(0,0,0,0.2)',
          },
          paper: {
            main: '#444',
            mode: '#3e3e3e',
          },

          table: {
            header1: '#424242',
            header2: '#616161',
            cell1: '#676767',
            cell2: '#757575',
            info: '#78909c',
            text: '#fff',
          },
        }),
  },

  components: {
    ...(mode === 'dark'
      ? {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: '0px',
                padding: '0px',
                paddingBottom: '4rem',
                background: '#444',
                msOverflowStyle: 'none',
                '::webkitScrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: 'fixed',

                right: '0',
                left: '0',
                backgroundColor: '#c2b298',
                color: '#1b1b1b',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#444',
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }
      : {
          //light mode
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: '0px',
                padding: '0px',
                background: '#ddd',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#ddd',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                right: '0',
                left: '0',
                // backgroundColor: "#c2b298",
                // color: "#1b1b1b",
              },
            },
          },

          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }),
  },
})





export const b = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#222',
            contrastText: '#c2b298',
          },
          secondary: {
            main: '#678087',
            contrastText: '#fff',
          },
          drawerListitem: {
            main: ' #fff',
            contrastText: '#1b1b1b',
            background: '#1b1b1b',
            neutral: '#888',
            selected: '#2196F3',
          },
          selected: {
            main: '#c2b298',
            contrast: '#1b1b1b',
            background: 'rgba(0,0,0,0.1)',
          },
          paper: {
            main: '#ccc',
            mode: '#eeeeee',
          },
          table: {
            table_header_primary: 'rgba(18,18,18,0.9)',
            header1: '#9e9e9e',
            header2: '#bdbdbd',
            row_dark: 'rgba(18,18,18,0.7)',
            row_light: 'rgba(48,48,48,0.35)',
            cell1: '#e0e0e0',
            cell2: '#eeeeee',
            info: '#78909c',
            text: '#111',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#222',
            contrastText: '#c2b298',
          },
          secondary: {
            main: '#678087',
            contrastText: '#fff',
          },
          drawerListitem: {
            main: '#1b1b1b',
            contrastText: '#fff',
            background: '#c2b298',
            neutral: '#bbb',
            selected: '#2196F3',
          },
          selected: {
            main: '#1b1b1b',
            contrast: '#c2b298',
            background: 'rgba(0,0,0,0.2)',
          },
          paper: {
            main: '#444',
            mode: '#3e3e3e',
          },
          table: {
            header1: '#424242',
            header2: '#616161',
            cell1: '#676767',
            cell2: '#757575',
            info: '#78909c',
            text: '#fff',
          },
        }),
  },
  components: {
    ...(mode === 'dark'
      ? {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: '0px',
                padding: '0px',
                background: '#444',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#444',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: 'fixed',

                right: '0',
                left: '0',
                backgroundColor: '#222',
                color: '#c2b298',
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }
      : {
          //light mode
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: '0px',
                padding: '0px',
                background: '#ddd',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#ddd',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                right: '0',
                left: '0',
                // backgroundColor: "#c2b298",
                // color: "#1b1b1b",
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }),
  },
})




export const c = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#533a40',
            contrastText: '#dfe0e4',
          },
          secondary: {
            main: '#868b8e',
            contrastText: '#333',
          },
          drawerListitem: {
            main: ' #fff',
            contrastText: '#1b1b1b',
            background: '#1b1b1b',
            neutral: '#888',
            selected: '#2196F3',
          },
          selected: {
            main: '#e3e5e3',
            contrast: '#678087',
            background: 'rgba(0,0,0,0.1)',
          },
          paper: {
            main: '#ccc',
            mode: '#EEEBEC',
          },
          table: {
            header1: '#A09396',
            header2: '#BAB0B3',
            cell1: '#DDD8D9',
            cell2: '#EEEBEC',
            info: '#78909c',
            text: '#111',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#533a40',
            contrastText: '#dfe0e4',
          },
          secondary: {
            main: '#868b8e',
            contrastText: '#f3f3f3',
          },
          drawerListitem: {
            main: '#1b1b1b',
            contrastText: '#fff',
            background: '#c2b298',
            neutral: '#bbb',
            selected: '#2196F3',
          },
          selected: {
            main: '#e3e5e3',
            contrast: '#678087',
            background: 'rgba(0,0,0,0.2)',
          },
          paper: {
            main: '#444',
            mode: '#3e3e3e',
          },
          table: {
            header1: '#424242',
            header2: '#616161',
            cell1: '#676767',
            cell2: '#757575',
            info: '#78909c',
            text: '#fff',
          },
        }),
  },
  components: {
    ...(mode === 'dark'
      ? {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: 'px',
                padding: '0px',
                background: '#444',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#444',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: 'fixed',

                right: '0',
                left: '0',
                backgroundColor: '#533a40',
                color: '#dfe0e4',
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }
      : {
          //light mode
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: 'px',
                padding: '0px',
                background: '#ddd',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: 'fixed',

                right: '0',
                left: '0',
                backgroundColor: '#533a40',
                color: '#dfe0e4',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#ddd',
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }),
  },
})




export const d = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#e3e5e3',
            contrastText: '#333',
          },
          secondary: {
            main: '#333333',
            contrastText: '#333',
          },
          drawerListitem: {
            main: ' #fff',
            contrastText: '#1b1b1b',
            background: '#1b1b1b',
            neutral: '#888',
            selected: '#2196F3',
          },
          selected: {
            main: '#e3e5e3',
            contrast: '#678087',
            background: 'rgba(0,0,0,0.1)',
          },
          paper: {
            main: '#ccc',
            mode: '#FBFBFB',
          },
          table: {
            header1: '#E9EAE9',
            header2: '#F0F1F0',
            cell1: '#F5F6F5',
            cell2: '#FBFBFB',
            info: '#78909c',
            text: '#111',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#e3e5e3',
            contrastText: '#1b1b1b',
          },
          secondary: {
            main: '#678087',
            contrastText: '#fff',
          },
          drawerListitem: {
            main: '#1b1b1b',
            contrastText: '#fff',
            background: '#c2b298',
            neutral: '#bbb',
            selected: '#2196F3',
          },
          selected: {
            main: '#e3e5e3',
            contrast: '#678087',
            background: 'rgba(0,0,0,0.2)',
          },
          paper: {
            main: '#444',
            mode: '#3e3e3e',
          },
          table: {
            header1: '#424242',
            header2: '#616161',
            cell1: '#676767',
            cell2: '#757575',
            info: '#78909c',
            text: '#fff',
          },
        }),
  },
  components: {
    ...(mode === 'dark'
      ? {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: 'px',
                padding: '0px',
                background: '#777',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#444',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: 'fixed',

                right: '0',
                left: '0',
                backgroundColor: '#CCCECC',
                color: '#333',
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }
      : {
          //light mode
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                height: '100%',
                width: '100%',
                margin: 'px',
                padding: '0px',
                background: '#fff',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: '#f3f3f3',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                position: 'fixed',

                right: '0',
                left: '0',
                backgroundColor: '#CCCECC',
                color: '#333',
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                backgroundColor: '#678087',
              },
            },
          },
        }),
  },
})